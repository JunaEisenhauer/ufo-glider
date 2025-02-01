import GameState from "../components/game/gameState";
import Ufo from "../components/game/ufo";
import System from "../system";
import SoundSystem from "./soundSystem";
import SpawnerSystem from "./spawner/spawnerSystem";

export default class GameStateSystem extends System {

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
        }

        if (!this.soundSystem) {
            this.soundSystem = this.world.findSystem(SoundSystem);
        }

        if (this.gameState.running && this.gameState.life <= 0) {
            this.gameOver();
        }

        if (this.gameState.running && this.ufo.entity.position.z >= this.gameState.goal()) {
            this.win();
        }
    }

    startGame() {
        this.gameState.running = true;
        if (this.gameState.alreadyPlayed) {
            this.resetGame();
        }

        this.gameState.alreadyPlayed = true;

        this.soundSystem.stop("win");
        this.soundSystem.stop("gameOver");
    }

    win() {
        this.soundSystem.play("win");
        this.gameState.level++;
        this.gameState.running = false;
        this.gameState.hasWon = true;
    }

    gameOver() {
        this.soundSystem.play("gameOver");
        this.gameState.running = false;
        this.gameState.hasWon = false;
    }

    resetGame() {
        this.gameState.life = this.gameState.initialLife;
        const ufo = System.findComponent(this.world.entities, Ufo);
        ufo.entity.position = {x: 0, y: 0, z: 0};

        const spaceStation = System.findTag(this.world.entities, "spaceStation");
        spaceStation.position = {z: this.gameState.goal() + 20};

        const spawner = this.world.findSystem(SpawnerSystem);
        spawner.reset();

        const rockets = System.findTags(this.world.entities, "rocket");
        rockets.forEach(rocket => {
            this.world.removeEntity(rocket);
        });

        const projectiles = System.findTags(this.world.entities, "projectile");
        projectiles.forEach(projectile => {
            this.world.removeEntity(projectile);
        });
    }
}
