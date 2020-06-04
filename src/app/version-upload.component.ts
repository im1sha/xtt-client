import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Vertex } from 'src/models/vertex';
import { Version } from 'src/models/version';
import { FileUploadService } from 'src/services/file-upload.service';
import { VersionService } from 'src/services/version.service';
import { TripArg } from 'src/models/trip-arg';
import { LinkRestoreService } from 'src/services/link-restore.service';

@Component({
    selector: 'version-upload',
    templateUrl: './xml-upload.component.html',
    providers: [FileUploadService, VersionService, LinkRestoreService]
})
export class VersionUploadComponent {

    private fileToUpload: File = null;
    private readonly uploadUrl: string = '/api/upload/';

    @Output() onCompleted = new EventEmitter<Version>();
    @Input() allVertices: Vertex[];
    @Input() header: string;

    constructor(
        private fileUploadService: FileUploadService,
        private versionService: VersionService,
        private restoreService: LinkRestoreService) {
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    uploadFileToActivity() {
        if (this.fileToUpload) {
            this.fileUploadService.postFile(this.fileToUpload, this.uploadUrl)
                .subscribe((data) => {
                    this.versionService.retrieveVersionFromFile(data.url)
                        .subscribe((tr: Version) => {

                            let result: Version = new Version([]);

                            if (tr != null && tr.tripGroups != null) {
                                result = tr;                        
                            }
                            this.onCompleted.emit(result);

                        }, error => { console.log(error); });
                }, error => { console.log(error); });
        }
    }
}