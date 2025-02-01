import Component from "../../component";

export default class GameState extends Component {

    constructor() {
        super();
        this.running = false;
        this.level = 1;
        this.stars = 0;
        this.initialLife = 1;
        this.life = this.initialLife;
        this.hasWon = null;
        this.skip = 0;
    }

    goal() {
        switch (this.level) {
            case 1:
                return 100;
            case 2:
                return 150;
            case 3:
                return 200;
            case 4:
                return 400;
            case 5:
                return 700;
            case 6:
                return 1_000;
            case 7:
                return 1_500;
            case 8:
                return 2_000;
            case 9:
                return 4_000;
            case 10:
                return 7_000;
            case 11:
                return 10_000;
            default:
                return (this.level - 11) * 10_000 + 10_000;
        }
    }
}
