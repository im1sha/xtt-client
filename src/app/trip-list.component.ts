import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TripGroup } from 'src/models/trip-group';
import { Trip } from 'src/models/trip';
import { TripArg } from 'src/models/trip-arg';

@Component({
    selector: 'trip-list',
    templateUrl: './trip-list.component.html',
})
export class TripListComponent {

    @Input() tripGroup: TripGroup;
    readonly defaultHeader: string = "Edit trip";
    readonly insertHeader: string = "Insert trip";
    header: string = "";
    insertOrEdit: boolean = false;
    actionPosition: number = undefined;
    activeItem: Trip = new Trip(new TripArg(), []);

    addTripBefore(p: Trip) {
        if (this.tripGroup && this.tripGroup.trips) {
            let index = this.tripGroup.trips.findIndex((el) => el === p);
            if (index > -1) {

                this.actionPosition = index;
                this.insertOrEdit = true;
                this.header = this.insertHeader;
                this.activeItem = new Trip(new TripArg(), []);

            }
        }
    }

    addTripAfter(p: Trip) {
        if (this.tripGroup && this.tripGroup.trips) {
            let index = this.tripGroup.trips.findIndex((el) => el === p);
            if (index > -1) {

                this.actionPosition = index + 1;
                this.insertOrEdit = true;
                this.header = this.insertHeader;
                this.activeItem = new Trip(new TripArg(), []);

            }
        }
    }

    dropTrip(p: Trip) {
        if (this.tripGroup && this.tripGroup.trips) {
            let index = this.tripGroup.trips.findIndex((el) => el === p);
            if (index > -1) {

                this.tripGroup.trips.splice(index, 1);

            }
        }
    }

    editTrip(p: Trip) {
        if (this.tripGroup && this.tripGroup.trips) {
            let index = this.tripGroup.trips.findIndex((el) => el === p);
            if (index > -1) {

                this.actionPosition = index;
                this.insertOrEdit = false;
                this.header = this.defaultHeader;
                this.activeItem = this.tripGroup.trips[index];

            }
        }
    }

    changed(p: { 'trip': Trip, 'ok': boolean }) {
        // edit
        if (this.insertOrEdit === false) {
            this.activeItem.tripArg = p.trip.tripArg;
            this.activeItem.arrivals = p.trip.arrivals;
        }
        else if (this.insertOrEdit === true){
            this.tripGroup.trips.splice(this.actionPosition, 0, p.trip);
        }
        this.actionPosition = undefined;
    }
}
