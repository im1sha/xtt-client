import { Component, OnInit, Input } from '@angular/core';
import { TripGroup } from 'src/models/trip-group';
import { TripGroupService } from 'src/services/trip-group.service';
import { PathModel } from 'src/models/path-model';

@Component({
    selector: 'trip-group-comp',
    templateUrl: './trip-group.component.html',
    providers: [TripGroupService],
})
export class TripGroupComponent implements OnInit {

    readonly tripGroupUploadHeader: string = "TripGroup from xml";

    @Input() tripGroup: TripGroup = new TripGroup([]);

    readonly downloadUrl: string = '/api/download/';
    pathToDownload: string = null;

    constructor(private tripGroupService: TripGroupService) { }

    ngOnInit() { }

    uploadFile(event: TripGroup) {
        if(!event || !event.trips) {
            event = new TripGroup([]);
        }
        this.tripGroup = event;
        console.log(event);
    }

    convertToFile() {
        this.tripGroupService
            .postFileByTripGroup(this.tripGroup)
            .subscribe((data: PathModel) => {
                this.pathToDownload = data?.ok
                    ? data?.url
                    : null;
            });
    }
}
