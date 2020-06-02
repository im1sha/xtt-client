import { RouteArg } from "./route-arg";
import { Vertex } from "./vertex";

export class Route {
    constructor(public routeArg?: RouteArg,
        public vertices?: Vertex[])
    { }
} 