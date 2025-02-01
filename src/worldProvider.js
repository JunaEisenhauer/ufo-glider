class WorldProvider {

    setWorld(world) {
        this.world = world;
        world.start();
    }
}

export default new WorldProvider();
