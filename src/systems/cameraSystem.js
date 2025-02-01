import {Vector3} from "three";
import Camera from "../components/three/camera/camera";
import System from "../system";

export default class CameraSystem extends System {

    constructor(world) {
        super();
        this.world = world;
        this.lookAt = new Vector3();
    }

    update() {
        if (!this.camera) {
            this.camera = System.findComponent(this.world.entities, Camera);
            if (!this.camera) {
                return;
            }
        }

        if (!this.camera.target) {
            return;
        }

        const target = this.camera.target;
        const targetOffset = this.camera.targetOffset;
        this.lookAt.x = target.position.x + targetOffset.x;
        this.lookAt.y = target.position.y + targetOffset.y;
        this.lookAt.z = target.position.z + targetOffset.z;
        this.camera.threeObject.lookAt(this.lookAt);
    }
}
