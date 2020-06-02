import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { Injectable } from '@angular/core';


@Injectable()
export class FileUploadService {
    constructor(private httpClient: HttpClient) { }

    postFile(fileToUpload: File, url: string): Observable<boolean> {
        console.log("FileUploadService.postFile");
        const endpoint = url;
        const formData: FormData = new FormData();
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        return this.httpClient
            .post(endpoint, formData, { headers: new HttpHeaders() })
            .pipe(
                map(() => { return true; }),
                catchError((e) => of( false )));
    }

}