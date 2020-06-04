import { Component, OnInit } from '@angular/core';
import { TripGroup } from 'src/models/trip-group';
import { TripGroupService } from 'src/services/trip-group.service';
import { PathModel } from 'src/models/path-model';

@Component({
    selector: 'trip-group-comp',
    templateUrl: './trip-group.component.html',
    providers: [],
})
export class TripGroupComponent implements OnInit {

    readonly tripGroupUploadHeader: string = "TripGroup from xml";

    tripGroup: TripGroup = new TripGroup([]);

    readonly downloadUrl: string = '/api/download/';
    pathToDownload: string = null;

    constructor(private tripGroupService: TripGroupService) { }

    ngOnInit() { }

    uploadFile(event: TripGroup) {
        this.tripGroup = event;
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
