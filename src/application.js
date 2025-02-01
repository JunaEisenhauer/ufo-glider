import GameLoop from "./gameLoop";
import worldProvider from "./worldProvider";
import BaseWorld from "./worlds/baseWorld";

export default class Application {

    constructor(canvas) {
        this.canvas = canvas;
        this.gameLoop = new GameLoop();
    }

    start() {
        const world = new BaseWorld(this.canvas);
        worldProvider.setWorld(world);
        this.gameLoop.run();
    }
}
