import Asset from "../components/game/asset";
import Collision from "../components/game/collision";
import Rotate from "../components/game/rotate";
import Tag from "../components/tag";
import Entity from "../entity";

export default class StarEntity extends Entity {
    constructor(isSuperStar) {
        super();
        if (isSuperStar) {
            this.scale = {x: 3, y: 3, z: 3};
            this.addComponent(new Tag(["star", "superstar"]));
            this.addComponent(new Collision({radius: 3, hitDelay: 0.2}));
        } else {
            this.addComponent(new Tag(["star"]));
            this.addComponent(new Collision({radius: 1, hitDelay: 0.2}));
        }

        this.addComponent(new Asset("star"));
        this.addComponent(new Rotate({y: 1.2}));
        this.rotation = {y: Math.random() * Math.PI * 2};
    }

    setSuperStar(isSuperStar) {
        if (isSuperStar) {
            this.scale = {x: 3, y: 3, z: 3};
            this.getComponent(Tag).setTags(["star", "superstar"]);
            this.getComponent(Collision).radius = 3;
        } else {
            this.scale = {x: 1, y: 1, z: 1};
            this.getComponent(Tag).setTags(["star"]);
            this.getComponent(Collision).radius = 1;
        }
    }
}
