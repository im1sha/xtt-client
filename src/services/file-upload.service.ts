import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { PathModel } from '../models/path-model';

@Injectable()
export class FileUploadService {
    constructor(private httpClient: HttpClient) { }

    postFile(fileToUpload: File, url: string): Observable<PathModel> {
        if (fileToUpload) {
            const endpoint = url;
            const formData: FormData = new FormData();
            formData.append('fileKey', fileToUpload, fileToUpload.name);
            return this.httpClient
                .post(endpoint, formData, { headers: new HttpHeaders() })
                .pipe(map((data: PathModel) => { return data; }),
                    catchError((e) => of(new PathModel())));
        }
        else {
            return from([new PathModel()]);
        }
    }
}