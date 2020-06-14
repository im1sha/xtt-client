import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TimetableItemList } from 'src/models/timetable-item-list';
import { TimetableService } from 'src/services/timetable.service';

@Component({
    selector: 'tt-comp',
    templateUrl: './timetable.component.html',
    providers: [TimetableService],
})
export class TimetableComponent {

    readonly downloadUrl: string = '/api/download/';
    pathToDownload: string = null;
    header: string = "Upload version";
    list: TimetableItemList = null;

    uploadFile(event: TimetableItemList) {
        if(!event || !event.isOk) {
            event = null;
        }
        this.list = event;
        console.log(event);
    }
}
