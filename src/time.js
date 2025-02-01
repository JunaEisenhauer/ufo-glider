class Time {
    constructor() {
        this.start = Date.now() / 1000;
        this.current = this.start;
        this.delta = 0;
        this.elapsed = 0;
    }

    update() {
        let newCurrent = Date.now() / 1000;
        this.delta = newCurrent - this.current;
        this.current = newCurrent;
        this.elapsed = this.current - this.start;
    }
}

export default new Time();
