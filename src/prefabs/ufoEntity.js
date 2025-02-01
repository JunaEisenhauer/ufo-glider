import Asset from "../components/game/asset";
import Bounce from "../components/game/bounce";
import Collision from "../components/game/collision";
import Rotate from "../components/game/rotate";
import Ufo from "../components/game/ufo";
import Velocity from "../components/game/velocity";
import Weapon from "../components/game/weapon";
import Tag from "../components/tag";
import BasicSphereMesh from "../components/three/mesh/basicSphereMesh";
import Entity from "../entity";

export default class UfoEntity extends Entity {
    constructor() {
        super();
        const ufo = new Ufo();
        this.addComponent(ufo);
        this.addComponent(new Asset("ufo"));
        this.addComponent(new Velocity({z: 0, maxX: 8, minX: -8, maxY: 8, minY: -8}));
        this.addComponent(new Collision({radius: 1.5, hitDelay: 1}));
        this.addComponent(new Bounce({strength: 450, ignoreZ: true}));
        this.addComponent(new Rotate({y: 0.4}));
        this.addComponent(new Weapon());
        const shield = new Entity().addComponent(new BasicSphereMesh({
            radius: ufo.shieldRadius,
            color: "#76b3f8",
            opacity: 0.5
        })).addComponent(new Tag(["shield"]));
        this.addChildEntity(shield);
    }
}
