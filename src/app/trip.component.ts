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

    // html markup only
    temp: Vertex = new Vertex();

    tableMode: boolean = true;
    addRequiredVertexNow: boolean = false;

    trip: Trip = null;
    pathToDownload: string = null;

    fileToUpload: File = null;

    constructor(
        private schemeService: SchemeGetService,
        private tripService: TripService,
        private fileUploadService: FileUploadService) { }

    ngOnInit() {
        this.load();
    }

    load() {
        this.schemeService
            .getVertices()
            .subscribe((data: Vertex[]) =>
                this.allVertices = data.sort((a, b) => a.id > b.id ? 1 : -1)
            );
    }

    cancel() {       
        this.temp = new Vertex();
        this.tableMode = true;
    }

    addForbiddenOne() {
        this.cancel();
        this.addRequiredVertexNow = false;
        this.tableMode = false;
    }

    addRequiredOne() {
        this.cancel();
        this.addRequiredVertexNow = true;
        this.tableMode = false;
    }

    displayData() {

        this.tripService
            .postObject(new TripArg(this.bidirectional,
                this.begin,
                this.end,
                this.forbidden,
                this.required,
                this.beginTime,
                this.endTime,
                this.name))
            .subscribe((data: Trip) => {
                this.trip = (data == null || data.arrivals == null)
                    ? null
                    : data;
                this.pathToDownload = null;
            });
    }

    saveForbiddenOne(p: Vertex) {
        if (!this.forbidden.some(item => item === p)) {
            this.forbidden.push(p);
        }
        this.cancel();
    }

    dropForbiddenOne(p: Vertex) {
        let index = this.forbidden.findIndex((el) => el === p);
        if (index > -1) {
            this.forbidden.splice(index, 1);
        }
    }

    saveRequiredOne(p: Vertex) {
        if (!this.required.some(item => item === p)) {
            this.required.push(p);
        }
        this.cancel();
    }

    dropRequiredOne(p: Vertex) {
        let index = this.required.findIndex((el) => el === p);
        if (index > -1) {
            this.required.splice(index, 1);
        }
    }

    convertToFile() {

        this.tripService
            .postFile(new TripArg(this.bidirectional,
                this.begin,
                this.end,
                this.forbidden,
                this.required,
                this.beginTime,
                this.endTime,
                this.name))
            .subscribe((data: PathModel) => {
                this.pathToDownload = data?.ok
                    ? data?.url
                    : null;
            });
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    uploadFileToActivity() {
        this.fileUploadService.postFile(this.fileToUpload, this.uploadUrl)
            .subscribe((data) => {
                this.tripService.retrieveTripFromFile(data.url)
                    .subscribe((tr: Trip) => {
                        this.trip = null;
                        if (tr != null) {
                            if (tr.tripArg != null) {
                                this.begin = this.allVertices.find(i => i.id === tr.tripArg.source?.id);                                
                                this.end = this.allVertices.find(i => i.id === tr.tripArg.destination?.id);
                                this.required = [];
                                tr.tripArg.requiredNodes?.forEach(element => {
                                    this.required.push(this.allVertices.find(i => i.id === element?.id));
                                });                             
                                this.forbidden = [];
                                tr.tripArg.forbiddenNodes?.forEach(element => {
                                    this.forbidden.push(this.allVertices.find(i => i.id === element?.id));
                                });                            
                                this.bidirectional = tr.tripArg.bidirectional;
                                this.beginTime = tr.tripArg.beginTime;
                                this.endTime = tr.tripArg.endTime,
                                this.name = tr.tripArg.name;
                            }
                        }
                    }, error => { console.log(error); });
            }, error => { console.log(error); });
    }
}
