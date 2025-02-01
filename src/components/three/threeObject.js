import {Object3D} from "three";
import Component from "../../component";

export default class ThreeObject extends Component {

    constructor(threeObject) {
        super();
        this.threeObject = threeObject || new Object3D();
    }
}
