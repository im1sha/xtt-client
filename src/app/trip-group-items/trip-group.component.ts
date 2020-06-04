import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { TripGroup } from 'src/models/trip-group';
import { TripGroupService } from 'src/services/trip-group.service';
import { PathModel } from 'src/models/path-model';

@Component({
    selector: 'trip-group-comp',
    templateUrl: './trip-group.component.html',
    providers: [TripGroupService],
})
export class TripGroupComponent implements OnInit, OnChanges  {

    readonly tripGroupUploadHeader: string = "TripGroup from xml";

    @Input() tripGroup: TripGroup = new TripGroup([]);

    readonly downloadUrl: string = '/api/download/';
    pathToDownload: string = null;

    constructor(private tripGroupService: TripGroupService) { }

    restoreLinks(tg: TripGroup) {
        if (!tg) {
            tg = new TripGroup([]);
        }
        else if (!tg.trips) {
            tg.trips = [];
        }

        this.tripGroup.name = tg.name;
        this.tripGroup.trips = tg.trips;
    }

    ngOnInit() {
        // this.restoreLinks(this.tripGroup);
    }

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            if (propName === 'tripGroup') {
                let newVal: TripGroup = changes[propName].currentValue;
                this.restoreLinks(newVal);
            }
        }
    }

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
