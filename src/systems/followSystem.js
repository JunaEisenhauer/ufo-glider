import Follower from "../components/game/follower";
import System from "../system";

export default class FollowSystem extends System {

    constructor(world) {
        super();
        this.world = world;
    }

    static #follow(follower) {
        const entity = follower.entity;
        const targetPosition = follower.target.position;
        entity.position = {
            x: follower.fixed && follower.fixed.x !== undefined ? follower.fixed.x : targetPosition.x + follower.offset.x,
            y: follower.fixed && follower.fixed.y !== undefined ? follower.fixed.y : targetPosition.y + follower.offset.y,
            z: follower.fixed && follower.fixed.z !== undefined ? follower.fixed.z : targetPosition.z + follower.offset.z
        };
    }

    update() {
        const followers = System.findComponents(this.world.entities, Follower);
        followers.forEach(FollowSystem.#follow);
    }
}
