import Component from "../../component";

export default class Weapon extends Component {
    constructor() {
        super();
        this.weaponLevel = 0;
        this.weaponReductionPerLevel = 0.1;
        this.weaponDelay = 3;
        this.weaponMinDelay = 0.1;
        this.lastShootTime = -this.weaponDelay;
    }
}
