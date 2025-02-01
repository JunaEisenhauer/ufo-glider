import GameState from "../../components/game/gameState";
import Spawner from "../../components/game/spawner";
import Ufo from "../../components/game/ufo";
import AlienEntity from "../../prefabs/alienEntity";
import RockEntity from "../../prefabs/rockEntity";
import StarEntity from "../../prefabs/starEntity";
import System from "../../system";
import RandomOffsetSpawner from "./randomOffsetSpawner";

export default class SpawnerSystem extends System {

    constructor(world) {
        super();
        this.world = world;
        this.objectSpawners = [
            new RandomOffsetSpawner(this, "star", () => {
                return new StarEntity(Math.random() < 0.2);
            }, object => {
                object.setSuperStar(Math.random() < 0.2);
            }),
            new RandomOffsetSpawner(this, "rock", () => {
                return new RockEntity(1, 0);
            }),
            new RandomOffsetSpawner(this, "rock2", () => {
                return new RockEntity(2, 0.5);
            }),
            new RandomOffsetSpawner(this, "rock3", () => {
                return new RockEntity(3, 1);
            }),
            new RandomOffsetSpawner(this, "rock4", () => {
                return new RockEntity(4, 2);
            }),
            new RandomOffsetSpawner(this, "rock5", () => {
                return new RockEntity(5, 6);
            }),
            new RandomOffsetSpawner(this, "alien", () => {
                return new AlienEntity();
            }),
            new RandomOffsetSpawner(this, "alien2", () => {
                return new AlienEntity();
            })
        ];
    }

    update() {
        if (!this.ufo) {
            this.ufo = System.findComponent(this.world.entities, Ufo);
        }

        if (!this.gameState) {
            this.gameState = System.findComponent(this.world.entities, GameState);
        }

        if (!this.spawner) {
            this.spawner = System.findComponent(this.world.entities, Spawner);
            this.startPositionZ = this.spawner.entity.position.z;
            this.spawnInitialObjects();
        }

        if (!this.gameState.running) {
            return;
        }

        const z = this.spawner.entity.position.z;
        if (this.gameState.goal() > z) {
            this.updateSpawner(z);
        }
    }

    updateSpawner(distance) {
        this.objectSpawners.forEach(objectSpawner => {
            objectSpawner.updateSpawner(distance, this.spawner);
        });
    }

    spawnInitialObjects() {
        const spawnerEntity = this.spawner.entity;
        for (let z = 0; z < this.startPositionZ; z++) {
            spawnerEntity.position = {z: z};
            this.updateSpawner(z);
        }

        spawnerEntity.position = {z: this.startPositionZ};
    }

    reset() {
        this.objectSpawners.forEach(objectSpawner => objectSpawner.reset());
        this.spawnInitialObjects();
    }
}
