import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Vertex } from 'src/models/vertex';
import { Trip } from 'src/models/trip';
import { FileUploadService } from 'src/services/file-upload.service';
import { TripService } from 'src/services/trip.service';
import { TripArg } from 'src/models/trip-arg';
import { LinkRestoreService } from 'src/services/link-restore.service';

@Component({
    selector: 'trip-upload',
    templateUrl: './trip-upload.component.html',
    providers: [FileUploadService, TripService, LinkRestoreService]
})
export class TripUploadComponent {

    private fileToUpload: File = null;
    private readonly uploadUrl: string = '/api/upload/';

    @Output() onCompleted = new EventEmitter<Trip>();
    @Input() allVertices: Vertex[];
    @Input() header: string;

    constructor(
        private fileUploadService: FileUploadService,
        private tripService: TripService,
        private restoreService: LinkRestoreService) {
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

                            let result: Trip = new Trip(new TripArg(), []);

                            if (tr != null) {
                                result.arrivals = !tr.arrivals 
                                    ? [] 
                                    : tr.arrivals;
                                result.tripArg = !tr.tripArg 
                                    ? new TripArg() 
                                    : tr.tripArg;

                                this.restoreService.restoreTripArgVertices(
                                    this.allVertices, 
                                    result.tripArg);                                
                            }
                            this.onCompleted.emit(result);

                        }, error => { console.log(error); });
                }, error => { console.log(error); });
        }
    }
}