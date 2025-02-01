import Component from "../../component";

export default class Rotate extends Component {
    constructor(parameters) {
        super();
        this.x = parameters.x || 0;
        this.y = parameters.y || 0;
        this.z = parameters.z || 0;
    }
}
