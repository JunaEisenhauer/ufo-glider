import System from "../system";
import {loadRGBE} from "../utils/assetLoader";

export default class EnvironmentSystem extends System {

    constructor(world) {
        super();
        loadRGBE(world, "environment/venice_sunset_1k.hdr", environment => {
            world.threeScene.environment = environment;
        });
    }
}
