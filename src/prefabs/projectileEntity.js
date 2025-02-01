import Collision from "../components/game/collision";
import Velocity from "../components/game/velocity";
import Tag from "../components/tag";
import BasicSphereMesh from "../components/three/mesh/basicSphereMesh";
import Entity from "../entity";

export default class ProjectileEntity extends Entity {

    constructor() {
        super();
        this.scale = {x: 0.2, y: 0.2, z: 0.2};
        this.addComponent(new Tag(["projectile"]));
        this.addComponent(new BasicSphereMesh({color: "#fff6d1"}));
        this.addComponent(new Velocity({z: 100}));
        this.addComponent(new Collision({radius: 0.3, hitDelay: 0.2}));
    }
}
