import Asset from "../components/game/asset";
import Tag from "../components/tag";
import Entity from "../entity";

export default class SpaceStationEntity extends Entity {

    constructor() {
        super();
        this.addComponent(new Asset("spaceStation"));
        this.addComponent(new Tag(["spaceStation"]));
        this.scale = {x: 15, y: 15, z: 15};
    }
}
