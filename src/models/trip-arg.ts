import { Vertex } from "./vertex";

export class TripArg {
    constructor(public bidirectional?: boolean,
        public source?: Vertex,
        public destination?: Vertex,
        public forbiddenNodes?: Vertex[],
        public requiredNodes?: Vertex[],
        public beginTime?: number,
        public endTime?: number,
        public name?: string) { } 
}