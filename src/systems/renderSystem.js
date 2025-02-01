import {sRGBEncoding, WebGLRenderer} from "three";
import System from "../system";
import CameraSystem from "./cameraSystem";

export default class RenderSystem extends System {

    constructor(world) {
        super();
        this.world = world;
        this.renderer = new WebGLRenderer({canvas: this.world.canvas, antialias: true, alpha: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor("#89b5d7");
        this.renderer.outputEncoding = sRGBEncoding;

        window.addEventListener("resize", () => {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            if (this.cameraSystem && this.cameraSystem.camera) {
                this.cameraSystem.camera.threeObject.updateProjectionMatrix();
            }
        });
    }

    update() {
        if (!this.cameraSystem) {
            this.cameraSystem = this.world.findSystem(CameraSystem);
        }

        if (!this.cameraSystem.camera) {
            return;
        }

        this.renderer.render(this.world.threeScene, this.cameraSystem.camera.threeObject);
    }
}
