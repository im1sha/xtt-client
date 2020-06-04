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

    pathToDownloadArgTrip: string = null;
    pathToDownloadArrivalsTrip: string = null;

    constructor(
        private schemeService: SchemeGetService,
        private tripService: TripService,
        private restoreService: LinkRestoreService) { }

    ngOnInit() {
        this.schemeService
            .getVertices()
            .subscribe((data: Vertex[]) => { this.allVertices = data.sort((a, b) => a.id > b.id ? 1 : -1); });
    }

    restoreLinks(trip: Trip) {
        if (!trip) {
            trip = new Trip(new TripArg(), []);
        }
        else if (!trip.arrivals) {
            trip.arrivals = [];
        }
        else if (!trip.tripArg) {
            trip.tripArg = new TripArg();
        }

        this.restoreService.restoreTripVertices(
            this.allVertices,
            trip.tripArg,
            trip.arrivals);

        this.trip.arrivals = trip.arrivals;
        this.trip.tripArg = trip.tripArg;
    }

    // uploads file from client
    uploadFile(trip: Trip) {
        this.restoreLinks(trip);
    }

    convertArgToFile() {
        this.tripService
            .postFileByArg(this.trip?.tripArg)
            .subscribe((data: PathModel) => {
                this.pathToDownloadArgTrip = data?.ok
                    ? data?.url
                    : null;
            });
    }

    convertFullTripToFile() {
        this.tripService
            .postFileByFullTrip(this.trip)
            .subscribe((data: PathModel) => {
                this.pathToDownloadArrivalsTrip = data?.ok
                    ? data?.url
                    : null;
            });
    }

    // on button 'create' click : removes all trip data but created with trip-arg
    createTripArg(_: any) {

        this.tripService
            .postObjectByArg(this.trip?.tripArg)
            .subscribe((data: Trip) => {
                this.restoreLinks(data);
                this.pathToDownloadArgTrip = null;
                this.pathToDownloadArrivalsTrip = null;
            });
    }

}
