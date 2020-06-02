import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TripArg } from '../models/trip-arg';

@Injectable()
export class TripService {

    private url = "/api/trip";

    constructor(private http: HttpClient) {
    }

    postFile(routeArg: TripArg) {

        return this.http.post(this.url + '/file', routeArg);
    }

    postObject(routeArg: TripArg) {
        return this.http.post(this.url + '/object', routeArg);
    }
}