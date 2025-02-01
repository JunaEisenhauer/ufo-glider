import Follower from "../components/game/follower";
import Camera from "../components/three/camera/camera";
import Sound from "../components/three/sound/sound";
import Entity from "../entity";

export default class CameraEntity extends Entity {
    constructor(target) {
        super();
        this.addComponent(new Camera({target: target, targetOffset: {z: 6}}));
        this.addComponent(new Follower(target, {x: 0, y: 4, z: -6}, {}));
        this.addComponent(new Sound({
            sounds: [
                {name: "explosion"},
                {name: "gliss"},
                {name: "gameOver"},
                {name: "win"},
                {name: "bonus"},
                {
                    name: "space",
                    loop: true,
                    volume: 0.2
                }]
        }));
    }
}
