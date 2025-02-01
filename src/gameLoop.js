import time from "./time";
import worldProvider from "./worldProvider";

export default class GameLoop {

    run() {
        window.requestAnimationFrame(() => {
            this.tick();
        });
    }

    tick() {
        time.update();
        worldProvider.world.update();
        this.run();
    }
}
