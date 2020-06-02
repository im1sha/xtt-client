import { SchemeItem } from "./scheme-item";
import { Coordinate } from "./coordinate";

export class Vertex extends SchemeItem {
    constructor(id?: string,
        minimalTime?: number,
        directNeighbours?: string[],
        public coordinate?: Coordinate) {

        super(id, minimalTime, directNeighbours);
    }
}