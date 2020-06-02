import { Vertex } from "./vertex";

export class RouteArg {
    constructor(public bidirectional?: boolean,
        public source?: Vertex,
        public destination?: Vertex,
        public forbiddenNodes?: Vertex[]) { } 
}