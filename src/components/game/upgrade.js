import Component from "../../component";

export default class Upgrade extends Component {
    constructor() {
        super();
        this.upgrades = {
            shield: {
                unlocked: false,
                level: 0,
                cost: 10,
                increaseCost: 5
            },
            weapon: {
                unlocked: false,
                level: 0,
                cost: 10,
                increaseCost: 5
            },
            skip: {
                unlocked: false,
                level: 0,
                cost: 10,
                increaseCost: 5
            }
        };
    }
}
