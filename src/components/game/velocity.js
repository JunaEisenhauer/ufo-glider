import Component from "../../component";

export default class Velocity extends Component {
    constructor(parameters) {
        super();

        this.x = parameters.x || 0;
        this.y = parameters.y || 0;
        this.z = parameters.z || 0;

        this.max = parameters.max;
        this.maxX = parameters.maxX;
        this.minX = parameters.minX;
        this.maxY = parameters.maxY;
        this.minY = parameters.minY;
        this.maxZ = parameters.maxZ;
        this.minZ = parameters.minZ;
    }
}
