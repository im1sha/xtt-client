import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Version } from 'src/models/version';

@Injectable()
export class VersionService {

    private url = "/api/version";

    constructor(private http: HttpClient) {
    }

    postFileByVersion(arg: Version) {

        return this.http.post(this.url + '/file', arg);
    }

    retrieveVersionFromFile(url: string) {
        return this.http.post(this.url + '/' + url, new Object());
    }
}