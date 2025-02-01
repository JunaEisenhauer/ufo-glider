import Alien from "../components/game/alien";
import Asset from "../components/game/asset";
import Collision from "../components/game/collision";
import Tag from "../components/tag";
import Entity from "../entity";

export default class AlienEntity extends Entity {
    constructor() {
        super();
        this.addComponent(new Alien({}));
        this.addComponent(new Asset("alien"));
        this.rotation = {y: Math.PI};
        this.addComponent(new Tag(["alien"]));
        // this.addComponent(new BasicSphereMesh({radius: 0.5, color: "#00ff00"}));
        this.addComponent(new Collision({radius: 0.5, hitDelay: 0.2}));
    }
}
