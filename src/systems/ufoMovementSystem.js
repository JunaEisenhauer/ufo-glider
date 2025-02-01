import GameState from "../components/game/gameState";
import Ufo from "../components/game/ufo";
import Velocity from "../components/game/velocity";
import System from "../system";
import time from "../time";
import ControlSystem from "./controlSystem";

export default class UfoMovementSystem extends System {

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
            this.velocity = this.ufo.entity.getComponent(Velocity);
        }

        if (!this.controlSystem) {
            this.controlSystem = this.world.findSystem(ControlSystem);
        }

        if (!this.gameState.running) {
            this.velocity.x = 0;
            this.velocity.y = 0;
            this.velocity.z = 0;
            return;
        }

        if (this.velocity.z === 0) {
            this.velocity.z = this.ufo.initialSpeed;
        }

        this.velocity.x += this.controlSystem.horizontal * this.ufo.controlAcceleration * time.delta;
        this.velocity.y += this.controlSystem.vertical * this.ufo.controlAcceleration * time.delta;
        this.velocity.z += this.ufo.flyAcceleration * time.delta;
        let x = this.ufo.entity.position.x;
        let y = this.ufo.entity.position.y;

        if (x > this.ufo.maxWidth) {
            x = this.ufo.maxWidth;
            this.velocity.x = 0;
        } else if (x < -this.ufo.maxWidth) {
            x = -this.ufo.maxWidth;
            this.velocity.x = 0;
        }

        if (y > this.ufo.maxHeight) {
            y = this.ufo.maxHeight;
            this.velocity.y = 0;
        } else if (y < -this.ufo.maxHeight) {
            y = -this.ufo.maxHeight;
            this.velocity.y = 0;
        }

        this.ufo.entity.position = {x, y};
    }
}
