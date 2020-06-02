import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouteArg } from '../models/route-arg';

@Injectable()
export class PathService {

    private url = "/api/path";

    constructor(private http: HttpClient) {
    }
  
    postFile(routeArg: RouteArg) {

        return this.http.post(this.url + '/file', routeArg);
    }

    postObject(routeArg: RouteArg) {
        return this.http.post(this.url + '/object', routeArg);
    }

}