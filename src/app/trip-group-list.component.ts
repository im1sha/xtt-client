import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TripGroup } from 'src/models/trip-group';
import { Trip } from 'src/models/trip';
import { Version } from 'src/models/version';
import { TripArg } from 'src/models/trip-arg';

@Component({
    selector: 'trip-group-list',
    templateUrl: './trip-group-list.component.html',
})
export class TripGroupListComponent {

    @Input() version: Version;
    readonly defaultHeader: string = "Edit trip group";
    readonly insertHeader: string = "Insert trip group";
    header: string = "";
    insertOrEdit: boolean = false;
    actionPosition: number = undefined;
    activeItem: TripGroup = new TripGroup([]);

    addTripGroupBefore(p: TripGroup) {
        if (this.version && this.version.tripGroups) {
            let index = this.version.tripGroups.findIndex((el) => el === p);
            if (index > -1) {

                this.actionPosition = index;
                this.insertOrEdit = true;
                this.header = this.insertHeader;
                this.activeItem = new TripGroup([]);

            }
        }
    }

    addTripGroupAfter(p: TripGroup) {
        if (this.version && this.version.tripGroups) {
            let index = this.version.tripGroups.findIndex((el) => el === p);
            if (index > -1) {

                this.actionPosition = index + 1;
                this.insertOrEdit = true;
                this.header = this.insertHeader;
                this.activeItem = new TripGroup([]);

            }
        }
    }

    dropTripGroup(p: TripGroup) {
        if (this.version && this.version.tripGroups) {
            let index = this.version.tripGroups.findIndex((el) => el === p);
            if (index > -1) {

                this.version.tripGroups.splice(index, 1);

            }
        }
    }

    editTripGroup(p: TripGroup) {
        if (this.version && this.version.tripGroups) {
            let index = this.version.tripGroups.findIndex((el) => el === p);
            if (index > -1) {

                this.actionPosition = index;
                this.insertOrEdit = false;
                this.header = this.defaultHeader;
                this.activeItem = this.version.tripGroups[index];

            }
        }
    }

    changed(p: { 'tripGroup': TripGroup, 'ok': boolean }) {
        // edit
        if (this.insertOrEdit === false) {
            this.activeItem.trips = p.tripGroup.trips;
            this.activeItem.name = p.tripGroup.name;
        }
        else if (this.insertOrEdit === true){
            this.version.tripGroups.splice(this.actionPosition, 0, p.tripGroup);
        }
        this.actionPosition = undefined;
    }
}
