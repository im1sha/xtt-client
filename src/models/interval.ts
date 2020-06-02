export class Interval {
    constructor(public begin?: number,
        public end?: number) { }

    length(): number {
        return this.end - this.begin;
    }
}