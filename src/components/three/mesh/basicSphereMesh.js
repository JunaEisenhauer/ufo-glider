import {Mesh, MeshBasicMaterial, SphereGeometry} from "three";
import ThreeObject from "../threeObject";

export default class BasicSphereMesh extends ThreeObject {
    constructor(parameters = {}) {
        const mesh = new Mesh(new SphereGeometry(parameters.radius), new MeshBasicMaterial({
            color: parameters.color || "#ffffff",
            transparent: !!parameters.opacity,
            opacity: parameters.opacity || 1
        }));
        super(mesh);
    }
}
