import * as assetLoader from "../../utils/assetLoader";
import ThreeObject from "../three/threeObject";

export default class Asset extends ThreeObject {
    constructor(name) {
        const asset = assetLoader.getGltf(name);
        super(asset);
    }
}
