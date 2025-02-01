import {PerspectiveCamera} from "three";
import ThreeObject from "../threeObject";

export default class Camera extends ThreeObject {
    constructor(parameters = {}) {
        const camera = new PerspectiveCamera(parameters.fov || 75, window.innerWidth / window.innerHeight, parameters.near || 0.01, parameters.far || 1100);
        super(camera);
        this.target = parameters.target;
        this.targetOffset = {
            x: parameters.targetOffset.x || 0,
            y: parameters.targetOffset.y || 0,
            z: parameters.targetOffset.z || 0
        };
    }
}
