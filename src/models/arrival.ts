import { Interval } from "./interval";
import { Vertex } from "./vertex";
import { Edge } from "./edge";

export class Arrival{
    constructor(public vertexInterval?: Interval,
        public outputEdgeInterval?: Interval,
        public vertex?: Vertex,
        public edge?: Edge) { }
}