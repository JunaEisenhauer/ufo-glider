import Component from "../../component";

export default class Collision extends Component {
    constructor(parameters) {
        super();
        this.radius = parameters.radius || 0;
        this.hit = new Set();
        this.hitDelay = parameters.hitDelay || 0;
        this.lastHitTime = -this.hitDelay;
    }
}
