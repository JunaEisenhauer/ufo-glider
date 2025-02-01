import System from "../system";
import {loadCubeTexture} from "../utils/assetLoader";

export default class BackgroundSystem extends System {

    constructor(world) {
        super();
        loadCubeTexture("environment/space/", ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"], cubeTexture => {
            world.threeScene.background = cubeTexture;
        });
    }
}
