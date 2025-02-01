import GameState from "../components/game/gameState";
import Ufo from "../components/game/ufo";
import System from "../system";
import GameStateSystem from "./gameStateSystem";

export default class UiSystem extends System {

    constructor(world) {
        super();
        this.world = world;

        this.ui = document.getElementById("ui");
        this.stars = document.getElementById("stars");
        this.distance = document.getElementById("distance");
    }

    update() {
        if (!this.gameStateSystem) {
            this.gameStateSystem = this.world.findSystem(GameStateSystem);
        }

        if (!this.gameState) {
            this.gameState = System.findComponent(this.world.entities, GameState);
        }

        if (!this.ufo) {
            this.ufo = System.findComponent(this.world.entities, Ufo);
        }

        this.stars.innerHTML = this.gameState.stars;
        this.distance.innerHTML = (this.gameState.goal() - Math.trunc(this.ufo.entity.position.z)) + "";

        this.ui.hidden = !this.gameState.running;
    }
}
