import { Arrival } from "./arrival";
import { TripArg } from "./trip-arg";

export class Trip {
    constructor(public tripArg?: TripArg,
        public arrivals?: Arrival[])
    { }
}