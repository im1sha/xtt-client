import { Component, OnInit } from '@angular/core';
import { SchemeGetService } from '../services/scheme-get.service';
import { PathService } from '../services/path.service';
import { Vertex } from '../models/vertex';
import { RouteArg } from '../models/route-arg';
import { Route } from '../models/route';
import { PathModel } from '../models/path-model';
import { FileUploadService } from '../services/file-upload.service';

@Component({
    selector: 'path-comp',
    templateUrl: './path.component.html',
    providers: [SchemeGetService, PathService, FileUploadService]
})
export class PathComponent implements OnInit {

    downloadUrl: string = '/api/download/';
    uploadUrl: string = '/api/upload/';

    allVertices: Vertex[] = [];
    forbidden: Vertex[] = [];

    begin: Vertex = new Vertex();
    end: Vertex = new Vertex();
    bidirectional: boolean = false;

    temp: Vertex = new Vertex();
    tableMode: boolean = true;

    route: Route = null;
    pathToDownload: string = null;

    fileToUpload: File = null;

    constructor(private dataService: SchemeGetService,
        private pathService: PathService,
        private fileUploadService: FileUploadService) { }

    ngOnInit() {
        this.load();
    }

    load() {
        this.dataService
            .getVertices()
            .subscribe((data: Vertex[]) => this.allVertices = data.sort((a, b) => a.id > b.id ? 1 : -1));
    }

    cancel() {
        this.temp = new Vertex();
        this.tableMode = true;
    }

    addForbiddenOne() {
        this.cancel();
        this.tableMode = false;
    }

    displayData() {

        this.pathService
            .postObject(new RouteArg(this.bidirectional, this.begin, this.end, this.forbidden))
            .subscribe((data: Route) => { this.route = (data == null || data.vertices == null) ? null : data; this.pathToDownload = null; });
    }

    saveForbiddenOne() {
        if (!this.forbidden.some(item => item === this.temp)) {
            this.forbidden.push(this.temp);
        }
        this.cancel();
    }

    dropForbiddenOne(p: Vertex) {
        let index = this.forbidden.findIndex((el) => el === p);
        if (index > -1) {
            this.forbidden.splice(index, 1);
        }
        this.cancel();
    }

    convertToFile() {

        this.pathService
            .postFile(new RouteArg(this.bidirectional, this.begin, this.end, this.forbidden))
            .subscribe((data: PathModel) => { this.pathToDownload = data?.ok ? data?.url : null; });
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    uploadFileToActivity() {
        this.fileUploadService.postFile(this.fileToUpload,
                                        this.uploadUrl).subscribe(data => { },
                                                                  error => { console.log(error); });
    }
}
