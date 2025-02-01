import Collision from "../components/game/collision";
import GameState from "../components/game/gameState";
import Tag from "../components/tag";
import System from "../system";
import SoundSystem from "./soundSystem";

export default class ProjectileSystem extends System {

    constructor(world) {
        super();
        this.world = world;
    }

    update() {
        if (!this.gameState) {
            this.gameState = System.findComponent(this.world.entities, GameState);
        }

        if (!this.soundSystem) {
            this.soundSystem = this.world.findSystem(SoundSystem);
        }

        const projectiles = System.findTags(this.world.entities, "projectile");

        projectiles.forEach(projectile => {
            const collision = projectile.getComponent(Collision);
            collision.hit.forEach(hit => {
                const hitTag = hit.entity.getComponent(Tag);
                if (hitTag) {
                    if (hitTag.hasTag("rock")) {
                        this.hitRock(projectile, hit.entity);
                    }

                    if (hitTag.hasTag("alien")) {
                        this.hitAlien(projectile, hit.entity);
                    }

                    if (hitTag.hasTag("rocket")) {
                        this.hitRocket(projectile, hit.entity);
                    }
                }
            });
        });
    }

    hitRock(projectile, rock) {
        this.world.removeEntity(projectile);
        rock.threeGroup.visible = false;
        this.soundSystem.play("explosion");
    }

    hitAlien(projectile, alien) {
        this.world.removeEntity(projectile);
        alien.threeGroup.visible = false;
        this.soundSystem.play("explosion");
    }

    hitRocket(projectile, rocket) {
        this.world.removeEntity(projectile);
        this.world.removeEntity(rocket);
        this.soundSystem.play("explosion");
    }
}
