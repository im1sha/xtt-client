import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Arrival } from 'src/models/arrival';
import { Trip } from 'src/models/trip';

@Component({
    selector: 'arrival-list',
    templateUrl: './arrival-list.component.html',
})
export class ArrivalListComponent {

    @Input() trip: Trip;

    
    addArrivalBefore(p: Arrival) {

    }

    addArrivalAfter(p: Arrival) {

    }

    dropArrival(p: Arrival) {
        if (this.trip !== null && this.trip.arrivals !== null) {
            let index = this.trip.arrivals.findIndex((el) => el === p);
            if (index > -1) {
                this.trip.arrivals.splice(index, 1);
            }
        }
        // console.log(this.trip)
    }

    editArrival(p: Arrival) {

    }
}