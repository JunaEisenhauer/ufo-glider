import Component from "../../component";

export default class Ufo extends Component {
    constructor() {
        super();
        this.initialSpeed = 8;
        this.flyAcceleration = 0.02;

        this.controlAcceleration = 12;

        this.maxHeight = 20;
        this.maxWidth = 20;

        this.swaySpeed = 3;
        this.swayStrength = 0.2;
        this.swayVerticalSpeed = 1;
        this.swayVerticalMultiplier = 1.5;
        this.swayStartTime = 0;

        this.radius = 1.5;
        this.shieldRadius = 3;

        this.weaponLevel = 1;
        this.weaponReductionPerLevel = 0.1;
        this.weaponDelay = 5;
        this.weaponMinDelay = 0.1;
        this.lastShootTime = -this.weaponDelay;

        this.skipDuration = 1.5;
        this.canCollect = true;
    }
}
