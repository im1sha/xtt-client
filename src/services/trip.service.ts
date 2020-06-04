import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TripArg } from '../models/trip-arg';
import { Trip } from 'src/models/trip';

@Injectable()
export class TripService {

    private url = "/api/trip";

    constructor(private http: HttpClient) {
    }

    postFileByArg(routeArg: TripArg) {

        return this.http.post(this.url + '/file-arg', routeArg);
    }

    postObjectByArg(routeArg: TripArg) {
        return this.http.post(this.url + '/object-arg', routeArg);
    }

    postFileByFullTrip(routeArg: Trip) {

        return this.http.post(this.url + '/file-full', routeArg);
    }

    postObjectByFullTrip(routeArg: Trip) {
        return this.http.post(this.url + '/object-full', routeArg);
    }

    retrieveTripFromFile(url: string) {
        return this.http.post(this.url + '/' + url, new Object());
    }
}