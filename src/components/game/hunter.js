import Component from "../../component";

export default class Hunter extends Component {
    constructor(target) {
        super();
        this.target = target;
        this.initialSpeed = 1000;
        this.acceleration = 4;
        this.shootAhead = 10;
    }
}
