import {BoxGeometry, Mesh, MeshBasicMaterial} from "three";
import ThreeObject from "../threeObject";

export default class BasicBoxMesh extends ThreeObject {

    constructor(parameters = {}) {
        const mesh = new Mesh(new BoxGeometry(parameters.width, parameters.height), new MeshBasicMaterial({color: parameters.color || "#ffffff"}));
        super(mesh);
    }
}
