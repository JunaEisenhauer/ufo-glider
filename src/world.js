import {Scene} from "three";
import Entity from "./entity";
import CameraSystem from "./systems/cameraSystem";
import RenderSystem from "./systems/renderSystem";

export default class World {

    entities = [];
    systems = [];

    constructor(canvas) {
        this.canvas = canvas;
        this.threeScene = new Scene();
    }

    createEntity() {
        const entity = new Entity();
        return this.addEntity(entity);
    }

    addEntity(entity) {
        this.entities.push(entity);
        this.threeScene.add(entity.threeGroup);
        return entity;
    }

    removeEntity(entity) {
        const index = this.entities.indexOf(entity);
        if (index !== -1) {
            this.entities.splice(index, 1);
        }

        this.threeScene.remove(entity.threeGroup);
        return entity;
    }

    registerSystem(system) {
        this.systems.push(system);
    }

    unregisterSystem(system) {
        const index = this.systems.indexOf(system);
        if (index !== -1) {
            this.systems.splice(index, 1);
        }
    }

    findSystem(type) {
        return this.systems.find(system => system instanceof type);
    }

    start() {
        this.registerSystem(new CameraSystem(this));
        this.registerSystem(new RenderSystem(this));
    }

    update() {
        this.systems.forEach(system => system.update());
    }
}
