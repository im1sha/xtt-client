import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ResolveCircleService {

    private url = "/api/resolve-circle";

    constructor(private http: HttpClient) {
    }

    postInitialFile() {
        return this.http.post(this.url + '/file-initial', new Object());
    }

    postFinalFile() {
        return this.http.post(this.url + '/file-final', new Object());
    }
}