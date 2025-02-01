export default class Component {

    constructor() {
        this.active = true;
    }

    attachEntity(entity) {
        this.entity = entity;
    }

    detachEntity() {
        this.entity = null;
    }
}
