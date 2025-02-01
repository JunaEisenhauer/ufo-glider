import {HemisphereLight} from "three";
import ThreeObject from "../threeObject";

export default class AmbientLight extends ThreeObject {
    constructor(parameters = {}) {
        const light = new HemisphereLight(0xffffff, 0xbbbbff, 1);
        super(light);
    }
}
