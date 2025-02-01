import {Vector3} from "three";
import Bounce from "../components/game/bounce";
import Collision from "../components/game/collision";
import Velocity from "../components/game/velocity";
import System from "../system";
import time from "../time";

export default class BounceSystem extends System {

    constructor(world) {
        super();
        this.world = world;
    }

    update() {
        for (const bounce of System.findComponents(this.world.entities, Bounce)) {
            const collision = bounce.entity.getComponent(Collision);
            if (!collision || collision.hit.length === 0) {
                continue;
            }

            collision.hit.forEach(other => this.collisionBounce(bounce, other));
        }
    }

    collisionBounce(bounce, other) {
        if (!other.entity.getComponent(Bounce)) {
            return;
        }

        const otherPosition = other.entity.position;
        const bouncePosition = bounce.entity.position;
        const x = bounce.ignoreX ? 0 : otherPosition.x - bouncePosition.x;
        const y = bounce.ignoreY ? 0 : otherPosition.y - bouncePosition.y;
        const z = bounce.ignoreZ ? 0 : otherPosition.z - bouncePosition.z;
        const direction = new Vector3(x, y, z).normalize().multiplyScalar(bounce.strength);
        const velocity = bounce.entity.getComponent(Velocity);
        velocity.x -= direction.x * time.delta;
        velocity.y -= direction.y * time.delta;
        velocity.z -= direction.z * time.delta;
    }
}
