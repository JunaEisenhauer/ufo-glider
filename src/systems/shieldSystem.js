import Collision from "../components/game/collision";
import GameState from "../components/game/gameState";
import Ufo from "../components/game/ufo";
import System from "../system";

export default class ShieldSystem extends System {

    constructor(world) {
        super();
        this.world = world;
    }

    update() {
        if (!this.ufo) {
            this.ufo = System.findComponent(this.world.entities, Ufo);
            this.shield = System.findTag(this.ufo.entity.children, "shield");
        }

        if (!this.gameState) {
            this.gameState = System.findComponent(this.world.entities, GameState);
        }

        if (this.gameState.life <= 1) {
            this.shield.threeGroup.visible = false;
            const collision = this.ufo.entity.getComponent(Collision);
            collision.radius = this.ufo.radius;
        } else {
            this.shield.threeGroup.visible = true;
            const collision = this.ufo.entity.getComponent(Collision);
            collision.radius = this.ufo.shieldRadius;
        }
    }
}
