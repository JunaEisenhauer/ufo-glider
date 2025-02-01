import Component from "../../component";

export default class Bounce extends Component {
    constructor(parameters) {
        super();
        this.strength = parameters.strength || 1;
        this.ignoreX = parameters.ignoreX;
        this.ignoreY = parameters.ignoreY;
        this.ignoreZ = parameters.ignoreZ;
    }
}
