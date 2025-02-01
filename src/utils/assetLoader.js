import {AudioLoader, CubeTextureLoader, PMREMGenerator} from "three";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader";
import RenderSystem from "../systems/renderSystem";

const assetsPath = "";
const gltfCache = {};
const audioCache = {};

function loadRGBE(world, asset, onLoad) {
    const loader = new RGBELoader();
    loader.setPath(assetsPath);
    const renderer = world.findSystem(RenderSystem).renderer;
    const pmremGenerator = new PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    loader.load(asset, texture => {
        const environment = pmremGenerator.fromEquirectangular(texture).texture;
        pmremGenerator.dispose();
        onLoad(environment);
    }, null, error => {
        console.error(`Failed to load RGBE asset ${asset}`);
        console.error(error.message);
    });
}

async function loadGLTF(asset, name) {
    if (gltfCache[name]) {
        return Promise.resolve(gltfCache[name]);
    }

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(assetsPath + "draco/");
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.setPath(assetsPath);
    return loader.loadAsync(asset, null).then(gltf => {
        gltfCache[name] = gltf.scene;
        return Promise.resolve(gltf.scene);
    }).catch(error => {
        console.error(`Failed to load GLTF asset ${asset}`);
        console.error(error.message);
    });
}

function getGltf(name) {
    return gltfCache[name].clone();
}

function loadCubeTexture(path, assets, onLoad) {
    const loader = new CubeTextureLoader();
    loader.setPath(assetsPath + path);
    loader.load(assets, cubeTexture => {
        onLoad(cubeTexture);
    }, null, error => {
        console.error(`Failed to load cube texture assets ${path} ${assets}`);
    });
}

async function loadAudio(asset, name) {
    if (audioCache[name]) {
        return Promise.resolve(audioCache[name]);
    }

    const audioLoader = new AudioLoader();
    audioLoader.setPath(assetsPath);
    return audioLoader.loadAsync(asset, null).then(audio => {
        audioCache[name] = audio;
        return Promise.resolve(audio);
    }).catch(error => {
        console.error(`Failed to load audio asset ${asset}`);
        console.error(error.message);
    });
}

function getAudio(name) {
    return audioCache[name];
}

export {loadRGBE, loadGLTF, getGltf, loadCubeTexture, loadAudio, getAudio};
