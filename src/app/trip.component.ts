import { Component, OnInit } from '@angular/core';
import { SchemeGetService } from '../services/scheme-get.service';
import { FileUploadService } from '../services/file-upload.service';
import { TripService } from '../services/trip.service';
import { Vertex } from '../models/vertex';
import { TripArg } from '../models/trip-arg';
import { Trip } from '../models/trip';
import { PathModel } from '../models/path-model';

@Component({
    selector: 'trip-comp',
    templateUrl: './trip.component.html',
    providers: [SchemeGetService, TripService, FileUploadService]
})
export class TripComponent implements OnInit {

    downloadUrl: string = '/api/download/';
    uploadUrl: string = '/api/upload/';

    allVertices: Vertex[] = [];
    forbidden: Vertex[] = [];
    required: Vertex[] = [];

    begin: Vertex = new Vertex();
    end: Vertex = new Vertex();

    bidirectional: boolean = false;
    beginTime: number;
    endTime: number;
    name: string;

    temp: Vertex = new Vertex();
    tableMode: boolean = true;

    trip: Trip = null;
    pathToDownload: string = null;

    fileToUpload: File = null;

    constructor(
        private schemeService: SchemeGetService,
        private tripService: TripService,
        private fileUploadService: FileUploadService)
    { }

    ngOnInit() {
        this.load();
    }

    load() {
        this.schemeService
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

        this.tripService
            .postObject(new TripArg(this.bidirectional, this.begin, this.end, this.forbidden, this.required, this.beginTime, this.endTime, this.name))
            .subscribe((data: Trip) =>
            {
                this.trip = (data == null || data.arrivals == null)
                    ? null
                    : data;
                this.pathToDownload = null;
            });
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

    saveRequiredOne() {
        if (!this.required.some(item => item === this.temp)) {
            this.required.push(this.temp);
        }
        this.cancel();
    }

    dropRequiredOne(p: Vertex) {
        let index = this.required.findIndex((el) => el === p);
        if (index > -1) {
            this.required.splice(index, 1);
        }
        this.cancel();
    }

    convertToFile() {

        this.tripService
            .postFile(new TripArg(this.bidirectional, this.begin, this.end, this.forbidden, this.required, this.beginTime, this.endTime, this.name))
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
