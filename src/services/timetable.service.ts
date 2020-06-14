import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TimetableService {

    private url = "/api/timetable";

    constructor(private http: HttpClient) {
    }

    retrieveTimetableFromFile(url: string) {
        return this.http.post(this.url + '/' + url, new Object());
    }
}