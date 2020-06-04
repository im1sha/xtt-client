import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileUploadService } from 'src/services/file-upload.service';
import { TripGroupService } from 'src/services/trip-group.service';
import { TripGroup } from 'src/models/trip-group';

@Component({
    selector: 'trip-group-upload',
    templateUrl: './xml-upload.component.html',
    providers: [FileUploadService, TripGroupService]
})
export class TripGroupUploadComponent {

    private fileToUpload: File = null;
    private readonly uploadUrl: string = '/api/upload/';

    @Output() onCompleted = new EventEmitter<TripGroup>();
    @Input() header: string;

    constructor(
        private fileUploadService: FileUploadService,
        private tripService: TripGroupService) {
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    uploadFileToActivity() {
        if (this.fileToUpload) {
            this.fileUploadService.postFile(this.fileToUpload, this.uploadUrl)
                .subscribe((data) => {
                    this.tripService.retrieveTripGroupFromFile(data.url)
                        .subscribe((tr: TripGroup) => {

                            let result: TripGroup = tr;
                            if (!tr || !tr.trips) {
                                result = new TripGroup([]);                           
                            }
                            this.onCompleted.emit(result);

                        }, error => { console.log(error); });
                }, error => { console.log(error); });
        }
    }
}