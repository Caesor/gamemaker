export default class Projection {
    constructor(min, max) {
        this.min = min
        this.max = max
    }

    overlaps(p) {
        return this.max > p.min && p.max > this.min
    }
}
