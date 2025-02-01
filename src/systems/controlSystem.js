import System from "../system";

export default class ControlSystem extends System {

    constructor(world) {
        super();
        this.world = world;

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.horizontal = 0;
        this.vertical = 0;
        this.shoot = false;

        document.addEventListener("keydown", this.keyDown.bind(this));
        document.addEventListener("keyup", this.keyUp.bind(this));
    }

    updateDirections() {
        if (this.up && !this.down) {
            this.vertical = 1;
        } else if (!this.up && this.down) {
            this.vertical = -1;
        } else {
            this.vertical = 0;
        }

        if (this.left && !this.right) {
            this.horizontal = 1;
        } else if (!this.left && this.right) {
            this.horizontal = -1;
        } else {
            this.horizontal = 0;
        }
    }

    keyDown(event) {
        switch (event.keyCode) {
            case 38: // up arrow
            case 87: // w
                this.up = true;
                break;
            case 30: // down arrow
            case 83: // s
                this.down = true;
                break;
            case 37: // left arrow
            case 65: // a
                this.left = true;
                break;
            case 39: // right arrow
            case 68: // d
                this.right = true;
                break;
            case 32: // space
                this.shoot = true;
                break;
        }

        this.updateDirections();
    }

    keyUp(event) {
        switch (event.keyCode) {
            case 38: // up arrow
            case 87: // w
                this.up = false;
                break;
            case 30: // down arrow
            case 83: // s
                this.down = false;
                break;
            case 37: // left arrow
            case 65: // a
                this.left = false;
                break;
            case 39: // right arrow
            case 68: // d
                this.right = false;
                break;
            case 32: // space
                this.shoot = false;
                break;
        }

        this.updateDirections();
    }
}
