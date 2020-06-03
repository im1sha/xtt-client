import { Component, OnInit } from '@angular/core';
import { SchemeGetService } from '../services/scheme-get.service';
import { FileUploadService } from '../services/file-upload.service';
import { TripService } from '../services/trip.service';
import { Vertex } from '../models/vertex';
import { TripArg } from '../models/trip-arg';
import { Trip } from '../models/trip';
import { PathModel } from '../models/path-model';
import { Arrival } from 'src/models/arrival';
import { LinkRestoreService } from 'src/services/link-restore.service';

@Component({
    selector: 'trip-comp',
    templateUrl: './trip.component.html',
    providers: [SchemeGetService, TripService, FileUploadService, LinkRestoreService]
})
export class TripComponent implements OnInit {

    readonly createTripArgHeader: string = "Create new trip";
    readonly arrivalChangeHeader: string = "Change arrival";
    readonly tripUploadHeader: string = "Trip from xml";

    readonly downloadUrl: string = '/api/download/';

    allVertices: Vertex[] = [];

    trip: Trip = new Trip(new TripArg(), []);

    pathToDownload: string = null;

    constructor(
        private schemeService: SchemeGetService,
        private tripService: TripService,
        private restoreService: LinkRestoreService) { }

    ngOnInit() {
        this.schemeService
            .getVertices()
            .subscribe((data: Vertex[]) =>
                this.allVertices = data.sort((a, b) => a.id > b.id ? 1 : -1)
            );
    }

    restoreTrip(trip: Trip) {
        if (!trip) {
            trip = new Trip(new TripArg(), []);
        }
        else if (!trip.arrivals) {
            trip.arrivals = [];
        }
        else if (!trip.tripArg) {
            trip.tripArg = new TripArg();
        }

        this.restoreService.restoreTripArgVertices(
            this.allVertices, 
            trip.tripArg);       

        this.trip.arrivals = trip.arrivals;
        this.trip.tripArg = trip.tripArg;
    }

    uploadFile(trip: Trip) {
        this.restoreTrip(trip);
    }

    convertToFile() {

       // !! POSTS tripArg AND GETS APPROPRIATE TRIP
       // but should not

        console.log(this.trip);
        this.tripService
            .postFile(this.trip?.tripArg)
            .subscribe((data: PathModel) => {
                this.pathToDownload = data?.ok
                    ? data?.url
                    : null;
            });
    }

    createTripArg(_: TripArg) {

        this.tripService
            .postObject(this.trip?.tripArg)
            .subscribe((data: Trip) => {
                this.restoreTrip(data);
                this.pathToDownload = null;
            });
    }
}
