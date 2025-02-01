import {Vector3} from "three";
import Alien from "../components/game/alien";
import GameState from "../components/game/gameState";
import Hunter from "../components/game/hunter";
import Ufo from "../components/game/ufo";
import Velocity from "../components/game/velocity";
import RocketEntity from "../prefabs/rocketEntity";
import System from "../system";
import time from "../time";

export default class AlienSystem extends System {

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
        }

        if (!this.gameState.running) {
            return;
        }

        for (const alien of System.findComponents(this.world.entities, Alien)) {
            if (alien.entity.threeGroup.visible && alien.lastShootTime + alien.shootDelay < time.current) {
                alien.lastShootTime = time.current;
                this.alienShoot(alien.entity);
            }
        }
    }

    alienShoot(alien) {
        const rocket = new RocketEntity(this.ufo.entity);
        rocket.position = alien.position;
        const position = rocket.position;
        const targetPosition = this.ufo.entity.position;
        const x = targetPosition.x - position.x;
        const y = targetPosition.y - position.y;
        const z = targetPosition.z - position.z;
        const hunter = rocket.getComponent(Hunter);
        const direction = new Vector3(x, y, z).normalize().multiplyScalar(hunter.initialSpeed);
        const velocity = rocket.getComponent(Velocity);
        velocity.x += direction.x * time.delta;
        velocity.y += direction.y * time.delta;
        velocity.z += direction.z * time.delta;
        this.world.addEntity(rocket);
    }
}
