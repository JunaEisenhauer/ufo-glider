import Asset from "../components/game/asset";
import Bounce from "../components/game/bounce";
import Collision from "../components/game/collision";
import Rotate from "../components/game/rotate";
import Velocity from "../components/game/velocity";
import Tag from "../components/tag";
import Entity from "../entity";

export default class RockEntity extends Entity {
    constructor(size, velocityPower) {
        super();
        const scaleSize = (Math.random() * 0.5 + 0.5) * size;
        this.scale = {x: scaleSize, y: scaleSize, z: scaleSize};
        this.addComponent(new Tag(["rock"]));
        this.addComponent(new Asset("rock"));
        this.addComponent(new Velocity({
            x: (Math.random() - 0.5) * velocityPower,
            y: (Math.random() - 0.5) * velocityPower,
            z: (Math.random() - 0.5) * velocityPower
        }));
        this.addComponent(new Collision({radius: scaleSize * 0.5, hitDelay: 0.2}));
        this.addComponent(new Bounce({strength: 500}));
        this.addComponent(new Rotate({
            x: (Math.random() * 2 - 1) * 1.2,
            y: (Math.random() * 2 - 1) * 1.2,
            z: (Math.random() * 2 - 1) * 1.2
        }));
    }
}
