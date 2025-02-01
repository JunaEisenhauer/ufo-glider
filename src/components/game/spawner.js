import Component from "../../component";

export default class Spawner extends Component {
    constructor() {
        super();
        this.despawnOffset = 10;
        this.settings = {
            star: {
                start: 30,
                next: 50,
                amount: 1,
                offsetX: 20,
                offsetY: 20
            },
            rock: {
                start: 20,
                next: 1,
                amount: 2,
                offsetX: 25,
                offsetY: 25
            },
            rock2: {
                start: 100,
                next: 2,
                amount: 1,
                offsetX: 25,
                offsetY: 25
            },
            rock3: {
                start: 150,
                next: 5,
                amount: 1,
                offsetX: 25,
                offsetY: 25
            },
            rock4: {
                start: 700,
                next: 10,
                amount: 1,
                offsetX: 25,
                offsetY: 25
            },
            rock5: {
                start: 1_000,
                next: 20,
                amount: 1,
                offsetX: 25,
                offsetY: 25
            },
            alien: {
                start: 500,
                next: 100,
                amount: 1,
                offsetX: 15,
                offsetY: 15
            },
            alien2: {
                start: 1_550,
                next: 90,
                amount: 1,
                offsetX: 15,
                offsetY: 15
            }
        };
    }
}
