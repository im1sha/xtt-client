import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trip } from 'src/models/trip';
import { TripArg } from 'src/models/trip-arg';
import { Vertex } from 'src/models/vertex';

@Component({
    selector: 'trip-arg-create',
    templateUrl: './trip-arg-create.component.html',
    providers: []
})
export class TripArgCreateComponent {

    readonly forbiddenHeader: string = "Forbidden vertices";
    readonly requiredHeader: string = "Required vertices";

    @Input() header: string = "";
    @Input() trip: Trip;
    @Input() allVertices : Vertex[];
    @Output() onCompleted = new EventEmitter<TripArg>();

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