import ObjectSpawner from "./objectSpawner";

export default class RandomOffsetSpawner extends ObjectSpawner {

    constructor(spawnerSystem, settings, createObject, respawnObject) {
        super(spawnerSystem, settings, createObject, respawnObject);
    }

    updateSpawner(distance) {
        super.updateSpawner(distance);
        if (this.last === undefined) {
            this.last = this.settings.start - 1;
        }

        if (this.last >= distance) {
            return;
        }

        if (this.settings.end && this.settings.end <= distance) {
            return;
        }

        this.last += this.settings.next;

        for (let i = 0; i < this.settings.amount; i++) {
            const randomOffsetX = (Math.random() * 2 - 1) * this.settings.offsetX;
            const randomOffsetY = (Math.random() * 2 - 1) * this.settings.offsetY;
            const object = this.getObject();
            object.position = {
                x: randomOffsetX,
                y: randomOffsetY,
                z: distance
            };
        }
    }

    reset() {
        super.reset();
        this.last = this.settings.start - 1;
    }
}
