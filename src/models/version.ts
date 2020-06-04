import { TripGroup } from "./trip-group";

export class Version {
    constructor(public tripGroups?: TripGroup[], public name? : string) { }
}