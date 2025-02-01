import Component from "../../component";

export default class Alien extends Component {
    constructor(parameters) {
        super();
        this.shootDelay = parameters.shootDelay || 10;
        this.lastShootTime = 0;
    }
}
