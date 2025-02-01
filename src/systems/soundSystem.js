import Sound from "../components/three/sound/sound";
import System from "../system";

export default class SoundSystem extends System {

    constructor(world) {
        super();
        this.world = world;
    }

    update() {
        if (!this.sound) {
            this.sound = System.findComponent(this.world.entities, Sound);
            this.play("space");
        }
    }

    play(name) {
        const audio = this.sound.audios[name];
        this.stop(name);
        audio.play();
    }

    stop(name) {
        const audio = this.sound.audios[name];
        if (audio.isPlaying) {
            audio.stop();
        }
    }
}
