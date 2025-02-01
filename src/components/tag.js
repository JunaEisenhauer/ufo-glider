import Component from "../component";

export default class Tag extends Component {
    constructor(tags = []) {
        super();
        this.tags = [].concat(tags);
    }

    hasTag(tag) {
        return !!this.tags.find(t => t === tag);
    }

    setTags(tags = []) {
        this.tags = [].concat(tags);
    }
}
