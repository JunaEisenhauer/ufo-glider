import Collision from "../components/game/collision";
import GameState from "../components/game/gameState";
import Ufo from "../components/game/ufo";
import Tag from "../components/tag";
import System from "../system";
import SoundSystem from "./soundSystem";

export default class CollectSystem extends System {

    constructor(world) {
        super();
        this.world = world;
    }

    update() {
        if (!this.gameState) {
            this.gameState = System.findComponent(this.world.entities, GameState);
        }

        if (!this.ufo) {
            this.ufo = System.findComponent(this.world.entities, Ufo);
            this.ufoCollision = this.ufo.entity.getComponent(Collision);
        }

        if (!this.soundSystem) {
            this.soundSystem = this.world.findSystem(SoundSystem);
        }

        if (!this.gameState.running) {
            return;
        }

        if (!this.ufo.canCollect) {
            return;
        }

        this.ufoCollision.hit.forEach(hit => {
            const hitTag = hit.entity.getComponent(Tag);
            if (hitTag) {
                if (hitTag.hasTag("star")) {
                    this.collectStar(hit.entity);
                }

                if (hitTag.hasTag("rock")) {
                    this.hitRock(hit.entity);
                }

                if (hitTag.hasTag("alien")) {
                    this.hitAlien(hit.entity);
                }

                if (hitTag.hasTag("rocket")) {
                    this.hitRocket(hit.entity);
                }
            }
        });
    }

    collectStar(star) {
        star.threeGroup.visible = false;

        if (star.getComponent(Tag).hasTag("superstar")) {
            this.gameState.stars++;
        }

        this.gameState.stars++;

        if (this.gameState.stars % 2 === 0) {
            this.soundSystem.play("gliss");
        } else {
            this.soundSystem.play("bonus");
        }
    }

    hitRock(rock) {
        // rock.threeGroup.visible = false;
        this.gameState.life--;
        this.soundSystem.play("explosion");
    }

    hitAlien(alien) {
        alien.threeGroup.visible = false;
        this.soundSystem.play("explosion");
    }

    hitRocket(rocket) {
        this.world.removeEntity(rocket);
        this.gameState.life--;
        this.soundSystem.play("explosion");
    }
}
