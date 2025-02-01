import Asset from "../components/game/asset";
import Collision from "../components/game/collision";
import Hunter from "../components/game/hunter";
import Velocity from "../components/game/velocity";
import VelocityRotation from "../components/game/velocityRotation";
import Tag from "../components/tag";
import Entity from "../entity";

export default class RocketEntity extends Entity {
    constructor(target) {
        super();
        this.addComponent(new Asset("rocket"));
        this.addComponent(new Tag(["rocket"]));
        this.addComponent(new Velocity({maxZ: 0, max: 10}));
        this.addComponent(new VelocityRotation());
        this.addComponent(new Collision({radius: 0.5, hitDelay: 0.2}));
        this.addComponent(new Hunter(target));
    }
}
