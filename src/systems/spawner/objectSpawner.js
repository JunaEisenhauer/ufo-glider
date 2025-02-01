export default class ObjectSpawner {

    constructor(spawnerSystem, settings, createObject, respawnObject) {
        this.spawnerSystem = spawnerSystem;
        this.settingsName = settings;
        this.createObject = createObject;
        this.respawnObject = respawnObject;
        this.objects = [];
    }

    updateSpawner(distance) {
        if (!this.settings) {
            this.settings = this.spawnerSystem.spawner.settings[this.settingsName];
        }
    }

    getObject() {
        const maxZ = this.spawnerSystem.ufo.entity.position.z - this.spawnerSystem.spawner.despawnOffset;
        const object = this.objects.find(object => object.position.z < maxZ);

        if (object) {
            object.threeGroup.visible = true;
            if (this.respawnObject) {
                this.respawnObject(object);
            }

            return object;
        }

        const newObject = this.createObject();
        this.spawnerSystem.world.addEntity(newObject);
        this.objects.push(newObject);
        return newObject;
    }

    reset() {
        this.objects.forEach(object => {
            object.threeGroup.visible = false;
        });
    }
}
