import BasicBoxMesh from "../components/three/mesh/basicBoxMesh";
import Entity from "../entity";

export default class Box extends Entity {
    constructor() {
        super();
        this.addComponent(new BasicBoxMesh());
    }
}
