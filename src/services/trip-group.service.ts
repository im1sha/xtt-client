import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TripGroup } from 'src/models/trip-group';

@Injectable()
export class TripGroupService {

    private url = "/api/trip-group";

    constructor(private http: HttpClient) {
    }

    postFileByTripGroup(routeArg: TripGroup) {

        return this.http.post(this.url + '/file', routeArg);
    }

    retrieveTripGroupFromFile(url: string) {
        return this.http.post(this.url + '/' + url, new Object());
    }
}