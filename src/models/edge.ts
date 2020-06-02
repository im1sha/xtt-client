import { Vertex } from "./vertex";
import { SchemeItem } from "./scheme-item";

export class Edge extends SchemeItem{
    constructor(id?: string,
        minimalTime?: number,
        directNeighbours?: string[],
        public source?: Vertex,
        public destination?: Vertex) {

        super(id, minimalTime, directNeighbours)
    }

}