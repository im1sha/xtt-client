import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Arrival } from 'src/models/arrival';
import { Trip } from 'src/models/trip';
import { Vertex } from 'src/models/vertex';
import { Interval } from 'src/models/interval';

@Component({
    selector: 'arrival-list',
    templateUrl: './arrival-list.component.html',
})
export class ArrivalListComponent {

    @Input() trip: Trip;
    @Input() allVertices: Vertex[];
    defaultHeader: string = "Edit arrival";
    actionPosition: number = undefined;
    activeItem: Arrival = new Arrival(new Interval(), new Interval());

    addArrivalBefore(p: Arrival) {
        if (this.trip && this.trip.arrivals) {
            let index = this.trip.arrivals.findIndex((el) => el === p);
            if (index > -1) {
                this.actionPosition = index;

            }
        }
    }

    addArrivalAfter(p: Arrival) {
        if (this.trip && this.trip.arrivals) {
            let index = this.trip.arrivals.findIndex((el) => el === p);
            if (index > -1) {
                this.actionPosition = index + 1;

            }
        }
    }

    dropArrival(p: Arrival) {
        if (this.trip && this.trip.arrivals) {
            let index = this.trip.arrivals.findIndex((el) => el === p);
            if (index > -1) {
                this.reset();

                this.trip.arrivals.splice(index, 1);
            }
        }
    }

    editArrival(p: Arrival) {
        if (this.trip && this.trip.arrivals) {
            let index = this.trip.arrivals.findIndex((el) => el === p);
            if (index > -1) {
                this.actionPosition = index;
                this.activeItem = this.trip.arrivals[index];
                console.log(this.activeItem);
            }
        }
    }

    changed(p: { 'arrival': Arrival, 'ok': boolean }) {
        this.reset();
    }

    reset() {
        this.actionPosition = undefined;
        this.activeItem = new Arrival(new Interval(), new Interval());
    }
}