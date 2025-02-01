import {Vector3} from "three";
import Velocity from "../components/game/velocity";
import VelocityRotation from "../components/game/velocityRotation";
import System from "../system";
import time from "../time";

export default class VelocitySystem extends System {

    constructor(world) {
        super();
        this.world = world;
    }

    update() {
        for (const velocity of System.findComponents(this.world.entities, Velocity)) {
            if (!velocity.active) {
                continue;
            }

            const lengthSqrt = velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z;
            if (lengthSqrt > velocity.max * velocity.max) {
                const maxVelocity = new Vector3(velocity.x, velocity.y, velocity.z).normalize().multiplyScalar(velocity.max);
                velocity.x = maxVelocity.x;
                velocity.y = maxVelocity.y;
                velocity.z = maxVelocity.z;
            }

            if (velocity.x > velocity.maxX) {
                velocity.x = velocity.maxX;
            }

            if (velocity.x < velocity.minX) {
                velocity.x = velocity.minX;
            }

            if (velocity.y > velocity.maxY) {
                velocity.y = velocity.maxY;
            }

            if (velocity.y < velocity.minY) {
                velocity.y = velocity.minY;
            }

            if (velocity.z > velocity.maxZ) {
                velocity.z = velocity.maxZ;
            }

            if (velocity.z < velocity.minZ) {
                velocity.z = velocity.minZ;
            }

            const entity = velocity.entity;
            const x = entity.position.x + velocity.x * time.delta;
            const y = entity.position.y + velocity.y * time.delta;
            const z = entity.position.z + velocity.z * time.delta;
            entity.position = {x, y, z};

            if (entity.getComponent(VelocityRotation)) {
                entity.threeGroup.lookAt(entity.position.x + velocity.x, entity.position.y + velocity.y, entity.position.z + velocity.z);
            }
        }
    }
}
