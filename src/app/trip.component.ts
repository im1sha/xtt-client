import { Component, OnInit } from '@angular/core';
import { SchemeGetService } from '../services/scheme-get.service';
import { FileUploadService } from '../services/file-upload.service';
import { TripService } from '../services/trip.service';
import { Vertex } from '../models/vertex';
import { TripArg } from '../models/trip-arg';
import { Trip } from '../models/trip';
import { PathModel } from '../models/path-model';
import { Arrival } from 'src/models/arrival';

@Component({
    selector: 'trip-comp',
    templateUrl: './trip.component.html',
    providers: [SchemeGetService, TripService, FileUploadService]
})
export class TripComponent implements OnInit {

    readonly createTripArgHeader: string = "Create new trip";
    readonly arrivalChangeHeader: string = "Change arrival";
    readonly tripUploadHeader: string = "Trip from xml";

    readonly downloadUrl: string = '/api/download/';

    allVertices: Vertex[] = [];

    trip: Trip = new Trip();
    tripArg: TripArg = new TripArg();

    pathToDownload: string = null;


    constructor(
        private schemeService: SchemeGetService,
        private tripService: TripService) { }

    ngOnInit() {
        this.schemeService
            .getVertices()
            .subscribe((data: Vertex[]) =>
                this.allVertices = data.sort((a, b) => a.id > b.id ? 1 : -1)
            );
    }

    uploadFile(trip: Trip) {
        this.tripArg = trip.tripArg ? trip.tripArg : new TripArg();    
        this.trip = trip;
        this.trip.tripArg = this.tripArg;
    }

    convertToFile() {

        this.tripService
            .postFile(this.trip?.tripArg)
            .subscribe((data: PathModel) => {
                this.pathToDownload = data?.ok
                    ? data?.url
                    : null;
            });
    }


    createTripArg(event: TripArg) {
        this.trip = new Trip(event, null);
        this.tripService
            .postObject(this.trip?.tripArg)
            .subscribe((data: Trip) => {
                console.log(data);
                this.trip = (data == null || data.arrivals == null)
                    ? null
                    : data;
                this.pathToDownload = null;
            });
    }


    // addArrivalBefore(p: Arrival) {

    // }

    // addArrivalAfter(p: Arrival) {

    // }

    // dropArrival(p: Arrival) {
    //     if (this.trip !== null && this.trip.arrivals !== null) {
    //         let index = this.trip.arrivals.findIndex((el) => el === p);
    //         if (index > -1) {
    //             this.trip.arrivals.splice(index, 1);
    //         }
    //     }
    // }

    // editArrival(p: Arrival) {

    // }

    // onArrivalChanged(arr: Arrival) {
    //     // this.vertexToChange = vertex;
    //     console.log(arr);
    // }
}
