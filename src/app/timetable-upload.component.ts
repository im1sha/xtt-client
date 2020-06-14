import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileUploadService } from 'src/services/file-upload.service';
import { TimetableService } from 'src/services/timetable.service';
import { LinkRestoreService } from 'src/services/link-restore.service';
import { TimetableItemList } from 'src/models/timetable-item-list';
import { TimetableItem } from 'src/models/timetable-item';

@Component({
    selector: 'tt-upload',
    templateUrl: './xml-upload.component.html',
    providers: [FileUploadService, TimetableService, LinkRestoreService]
})
export class TimetableUploadComponent {

    private fileToUpload: File = null;
    private readonly uploadUrl: string = '/api/upload/';

    @Output() onCompleted = new EventEmitter<TimetableItemList>();
    @Input() header: string;

    constructor(
        private fileUploadService: FileUploadService,
        private timetableService: TimetableService) {
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    uploadFileToActivity() {
        if (this.fileToUpload) {
            this.fileUploadService.postFile(this.fileToUpload, this.uploadUrl)
                .subscribe((data) => {
                    this.timetableService.retrieveTimetableFromFile(data.url)
                        .subscribe((tr: TimetableItemList) => {
                            if (!tr || !tr.items) {
                                tr = new TimetableItemList(false, Array<{ 'key': string, 'value': TimetableItem[] }>());
                            }
                            this.onCompleted.emit(tr);

                        }, error => { console.log(error); });
                }, error => { console.log(error); });
        }
    }
}