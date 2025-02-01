import Collision from "../components/game/collision";
import GameState from "../components/game/gameState";
import Ufo from "../components/game/ufo";
import Velocity from "../components/game/velocity";
import System from "../system";
import time from "../time";

export default class SkipSystem extends System {

    constructor(world) {
        super();
        this.world = world;
        this.skipped = false;
    }

    update() {
        if (!this.ufo) {
            this.ufo = System.findComponent(this.world.entities, Ufo);
            this.ufoVelocity = this.ufo.entity.getComponent(Velocity);
            this.ufoCollision = this.ufo.entity.getComponent(Collision);
        }

        if (!this.gameState) {
            this.gameState = System.findComponent(this.world.entities, GameState);
        }

        if (!this.gameState.running) {
            return;
        }

        if (this.gameState.skip > 0 && this.ufo.entity.position.z < this.gameState.skip) {
            this.skipped = false;
            this.ufo.canCollect = false;
            this.ufoVelocity.z = this.gameState.skip / this.ufo.skipDuration;
        } else if (!this.skipped) {
            this.skipped = true;
            this.ufo.canCollect = true;
            this.ufoVelocity.z = this.ufo.initialSpeed;
            this.ufoCollision.lastHitTime = time.current;
        }
    }
}
