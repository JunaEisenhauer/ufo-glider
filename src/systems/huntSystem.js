import {Vector3} from "three";
import GameState from "../components/game/gameState";
import Hunter from "../components/game/hunter";
import Velocity from "../components/game/velocity";
import System from "../system";
import time from "../time";

export default class HuntSystem extends System {

    constructor(world) {
        super();
        this.world = world;
    }

    update() {
        if (!this.gameState) {
            this.gameState = System.findComponent(this.world.entities, GameState);
        }

        if (!this.gameState.running) {
            return;
        }

        System.findComponents(this.world.entities, Hunter).forEach(hunter => this.hunt(hunter));
    }

    hunt(hunter) {
        const entity = hunter.entity;
        const position = entity.position;
        const targetPosition = hunter.target.position;
        const x = targetPosition.x - position.x;
        const y = targetPosition.y - position.y;
        const z = targetPosition.z - position.z + hunter.shootAhead;
        const direction = new Vector3(x, y, z).normalize();
        const acceleration = direction.multiplyScalar(hunter.acceleration);
        const velocity = entity.getComponent(Velocity);
        velocity.x += acceleration.x * time.delta;
        velocity.y += acceleration.y * time.delta;
        velocity.z += acceleration.z * time.delta;
    }
}
