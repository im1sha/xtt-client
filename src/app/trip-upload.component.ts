import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Vertex } from 'src/models/vertex';
import { Trip } from 'src/models/trip';
import { FileUploadService } from 'src/services/file-upload.service';
import { TripService } from 'src/services/trip.service';
import { TripArg } from 'src/models/trip-arg';

@Component({
    selector: 'trip-upload',
    templateUrl: './trip-upload.component.html',
    providers: [FileUploadService, TripService]
})
export class TripUploadComponent {

    private fileToUpload: File = null;
    private readonly uploadUrl: string = '/api/upload/';

    @Output() onCompleted = new EventEmitter<Trip>();
    @Input() allVertices: Vertex[];
    @Input() header: string;

    constructor(
        private fileUploadService: FileUploadService,
        private tripService: TripService) {
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    uploadFileToActivity() {
        if (this.fileToUpload) {
            this.fileUploadService.postFile(this.fileToUpload, this.uploadUrl)
                .subscribe((data) => {
                    this.tripService.retrieveTripFromFile(data.url)
                        .subscribe((tr: Trip) => {

                            let result: Trip = null;

                            if (tr != null) {
                                result = new Trip(null, tr.arrivals);

                                if (tr.tripArg != null) {
                                    result.tripArg = new TripArg();

                                    result.tripArg.source = this.allVertices.find(i => i.id === tr.tripArg.source?.id);
                                    result.tripArg.destination = this.allVertices.find(i => i.id === tr.tripArg.destination?.id);

                                    let required: Vertex[] = [];
                                    tr.tripArg.requiredNodes?.forEach(element => {
                                        required.push(this.allVertices.find(i => i.id === element?.id));
                                    });
                                    let forbidden: Vertex[] = [];
                                    tr.tripArg.forbiddenNodes?.forEach(element => {
                                        forbidden.push(this.allVertices.find(i => i.id === element?.id));
                                    });

                                    result.tripArg.requiredNodes = required;
                                    result.tripArg.forbiddenNodes = forbidden;
                                    result.tripArg.bidirectional = tr.tripArg.bidirectional;
                                    result.tripArg.beginTime = tr.tripArg.beginTime;
                                    result.tripArg.endTime = tr.tripArg.endTime;
                                    result.tripArg.name = tr.tripArg.name;
                                }
                            }
                            this.onCompleted.emit(result);

                        }, error => { console.log(error); });
                }, error => { console.log(error); });
        }
        else {
            this.onCompleted.emit(new Trip());
        }
    }
}