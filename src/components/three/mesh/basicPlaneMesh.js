import {Mesh, MeshBasicMaterial, PlaneGeometry} from "three";
import ThreeObject from "../threeObject";


export default class BasicPlaneMesh extends ThreeObject {

    constructor(parameters = {}) {
        const mesh = new Mesh(new PlaneGeometry(), new MeshBasicMaterial({color: parameters.color || "#ffffff"}));
        super(mesh);
    }
}
