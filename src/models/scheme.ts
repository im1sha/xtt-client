import { Vertex } from "./vertex";
import { Edge } from "./edge";

export class Scheme {
    constructor(public verteces?: Vertex[],
        public edges?: Edge[]) { }
}