import Component from "../../component";

export default class Follower extends Component {
    constructor(target, offset, fixed) {
        super();
        this.target = target;
        this.offset = {x: offset.x || 0, y: offset.y || 0, z: offset.z || 0};
        this.fixed = fixed;
    }
}
