import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { Trip } from 'src/models/trip';
import { TripArg } from 'src/models/trip-arg';
import { Vertex } from 'src/models/vertex';

@Component({
    selector: 'trip-arg-create',
    templateUrl: './trip-arg-create.component.html',
    providers: []
})
export class TripArgCreateComponent implements OnInit, OnChanges {

    readonly forbiddenHeader: string = "Forbidden vertices";
    readonly requiredHeader: string = "Required vertices";

    @Input() header: string = "";
    @Input() trip: Trip;
    @Input() allVertices: Vertex[];
    @Output() onCompleted = new EventEmitter<TripArg>();

    ngOnInit() {
        this.restoreLinks(this.trip);
    }

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            if (propName === 'trip') {
                let newVal: Trip = changes[propName].currentValue;
                this.restoreLinks(newVal);
            }
        }
    }

    restoreLinks(trip: Trip) {
        if (trip && trip.tripArg && (!trip.tripArg.forbiddenNodes || !trip.tripArg.requiredNodes)) {
            if (!trip.tripArg.forbiddenNodes) {
                trip.tripArg.forbiddenNodes = [];
            }
            if (!trip.tripArg.requiredNodes) {
                trip.tripArg.requiredNodes = [];
            }
        }
    }


    save() {
        this.onCompleted.emit(this.trip?.tripArg);
    }

    requiredChanged(event: Vertex[]) {
        if (this.trip && this.trip.tripArg)
            this.trip.tripArg.requiredNodes = event;
    }

    forbiddenChanged(event: Vertex[]) {
        if (this.trip && this.trip.tripArg)
            this.trip.tripArg.forbiddenNodes = event;
    }
}