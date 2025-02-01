import {PointOctree} from "sparse-octree";
import {Vector3} from "three";
import Collision from "../components/game/collision";
import System from "../system";
import time from "../time";

export default class CollisionSystem extends System {

    constructor(world) {
        super();
        this.world = world;
        this.collisionPosition = new Vector3();
        this.otherPosition = new Vector3();
    }

    update() {
        const min = new Vector3(-100, -100, -10);
        const max = new Vector3(100, 100, 1200);
        const octree = new PointOctree(min, max);

        const activeCollisions = System.findComponents(this.world.entities, Collision).filter(collision => collision.active && collision.entity.threeGroup.visible);
        activeCollisions.forEach(collision => {
            collision.hit.clear();
            octree.set(collision.entity.threeGroup.position, collision);
        });

        const hitableCollisions = activeCollisions.filter(collision => collision.lastHitTime + collision.hitDelay <= time.current);
        for (const collision of hitableCollisions) {
            const nearPoints = octree.findPoints(collision.entity.threeGroup.position, collision.radius * 2);
            for (const point of nearPoints) {
                const other = point.data;
                const intersectDistance = collision.radius + other.radius;
                if (point.distance <= intersectDistance) {
                    if (collision === other) {
                        continue;
                    }

                    collision.hit.add(other);
                    other.hit.add(collision);
                    collision.lastHitTime = time.current;
                    other.lastHitTime = time.current;
                }
            }
        }

        // for (let i = 0; i < collisions.length; i++) {
        //     for (let j = i + 1; j < collisions.length; j++) {
        //         const collision = collisions[i];
        //         const other = collisions[j];
        //         if (collision.lastHitTime + collision.hitDelay > time.current
        //             || other.lastHitTime + other.hitDelay > time.current) {
        //             continue;
        //         }
        //
        //
        //         collision.entity.threeGroup.getWorldPosition(this.collisionPosition);
        //         other.entity.threeGroup.getWorldPosition(this.otherPosition);
        //         const a = collision.radius + other.radius;
        //         const x = this.collisionPosition.x - this.otherPosition.x;
        //         const y = this.collisionPosition.y - this.otherPosition.y;
        //         const z = this.collisionPosition.z - this.otherPosition.z;
        //         if (
        //             // this.collisionPosition.x - collision.radius <= this.otherPosition.x + other.radius &&
        //             // this.collisionPosition.x + collision.radius >= this.otherPosition.x - other.radius
        //             // &&
        //             // this.collisionPosition.y - collision.radius <= this.otherPosition.y + other.radius &&
        //             // this.collisionPosition.y + collision.radius >= this.otherPosition.y - other.radius
        //             // &&
        //             // this.collisionPosition.z - collision.radius <= this.otherPosition.z + other.radius &&
        //             // this.collisionPosition.z + collision.radius >= this.otherPosition.z - other.radius
        //             a * a > (x * x) + (y * y) + (z * z)
        //         ) {
        //             collision.hit.push(other);
        //             other.hit.push(collision);
        //             collision.lastHitTime = time.current;
        //             other.lastHitTime = time.current;
        //         }
        //     }
        // }
    }
}
