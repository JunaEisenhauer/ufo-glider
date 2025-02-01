import GameState from "../components/game/gameState";
import Rotate from "../components/game/rotate";
import Ufo from "../components/game/ufo";
import System from "../system";
import time from "../time";

export default class AnimationSystem extends System {

    constructor(world) {
        super();
        this.world = world;
    }

    update() {
        if (!this.gameState) {
            this.gameState = System.findComponent(this.world.entities, GameState);
        }

        const ufo = System.findComponent(this.world.entities, Ufo);
        this.swayUfo(ufo);
        this.autoPilot(ufo);

        System.findComponents(this.world.entities, Rotate).forEach(rotate => this.rotateAnimation(rotate));
    }

    rotateAnimation(rotate) {
        rotate.entity.rotation = {
            x: (rotate.entity.rotation.x + time.delta * rotate.x) % (Math.PI * 2),
            y: (rotate.entity.rotation.y + time.delta * rotate.y) % (Math.PI * 2),
            z: (rotate.entity.rotation.z + time.delta * rotate.z) % (Math.PI * 2)
        };
    }

    swayUfo(ufo) {
        ufo.entity.rotation = {z: Math.sin(time.elapsed * ufo.swaySpeed) * ufo.swayStrength};
    }

    autoPilot(ufo) {
        if (!this.gameState.running) {
            ufo.entity.position = {y: (ufo.autoPilotYCenter || 0) + Math.sin(time.elapsed - ufo.swayStartTime * ufo.swayVerticalSpeed) * ufo.swayVerticalMultiplier};
        } else {
            ufo.autoPilotYCenter = ufo.entity.position.y;
            ufo.swayStartTime = time.elapsed;
        }
    }
}
