import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileModel } from '../models/file-model';

@Injectable()
export class FilesService {

    private url = "/api/file";

    constructor(private http: HttpClient) {
    }

    getFiles() {
        return this.http.get(this.url);
    }

    getFile(id: number) {
        return this.http.get(this.url + '/' + id);
    }

    createFile(fileModel: FileModel) {
        return this.http.post(this.url, fileModel);
    }
    updateFile(fileModel: FileModel) {

        return this.http.put(this.url, fileModel);
    }
    deleteFile(id: number) {
        return this.http.delete(this.url + '/' + id);
    }
}