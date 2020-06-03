import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Vertex } from 'src/models/vertex';
import { Arrival } from 'src/models/arrival';
import { Interval } from 'src/models/interval';

@Component({
    selector: 'arrival-add',
    templateUrl: './arrival-add.component.html',
})
export class ArrivalAddComponent {
    @Input() beginTime: number;
    @Input() endTime: number;
    @Input() allVertices: Vertex[];
    @Input() header: string;
    @Input() selectedVertex: Vertex;

    @Output() onSaved = new EventEmitter<Arrival>();

    result: Arrival;

    dataChanged(event: Vertex) {      
        this.result = new Arrival(
            new Interval(this.beginTime, this.endTime),
            null,
            event,
            null);
    }

    save() {
        console.log(this.result);
        if (this.beginTime === undefined) this.beginTime = 0;
        if (this.endTime === undefined) this.endTime = 0;
        this.onSaved.emit(this.result);
    }

    cancel() {
    }
}