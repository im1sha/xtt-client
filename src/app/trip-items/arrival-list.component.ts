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

    readonly defaultHeader: string = "Edit arrival";
    readonly insertHeader: string = "Insert arrival";
    header: string = "";
    insertOrEdit: boolean = false;
    actionPosition: number = undefined;
    activeItem: Arrival = new Arrival(new Interval(), new Interval());

    addArrivalBefore(p: Arrival) {
        if (this.trip && this.trip.arrivals) {
            let index = this.trip.arrivals.findIndex((el) => el === p);
            if (index > -1) {

                this.actionPosition = index;
                this.insertOrEdit = true;
                this.header = this.insertHeader;
                this.activeItem = new Arrival(new Interval(), new Interval());

            }
        }
    }

    addArrivalAfter(p: Arrival) {
        if (this.trip && this.trip.arrivals) {
            let index = this.trip.arrivals.findIndex((el) => el === p);
            if (index > -1) {

                this.actionPosition = index + 1;
                this.insertOrEdit = true;
                this.header = this.insertHeader;
                this.activeItem = new Arrival(new Interval(), new Interval());


            }
        }
    }

    dropArrival(p: Arrival) {
        if (this.trip && this.trip.arrivals) {
            let index = this.trip.arrivals.findIndex((el) => el === p);
            if (index > -1) {

                this.trip.arrivals.splice(index, 1);

            }
        }
    }

    editArrival(p: Arrival) {
        if (this.trip && this.trip.arrivals) {
            let index = this.trip.arrivals.findIndex((el) => el === p);
            if (index > -1) {

                this.actionPosition = index;
                this.insertOrEdit = false;
                this.header = this.defaultHeader;
                this.activeItem = this.trip.arrivals[index];

            }
        }
    }

    changed(p: { 'arrival': Arrival, 'ok': boolean }) {
        // edit
        if (this.insertOrEdit === false) {
            this.activeItem.vertex = p.arrival.vertex;
            this.activeItem.vertexInterval = p.arrival.vertexInterval;
        }
        else if (this.insertOrEdit === true){
            this.trip.arrivals.splice(this.actionPosition, 0, p.arrival);
        }
        this.actionPosition = undefined;
    }
}
