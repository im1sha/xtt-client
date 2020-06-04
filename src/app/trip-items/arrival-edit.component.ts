import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Vertex } from 'src/models/vertex';
import { Arrival } from 'src/models/arrival';
import { Interval } from 'src/models/interval';

@Component({
    selector: 'arrival-edit',
    templateUrl: './arrival-edit.component.html',
})
export class ArrivalEditComponent {

    @Input() beginTime: number;
    @Input() endTime: number;
    @Input() allVertices: Vertex[];
    @Input() header: string;
    @Input() selectedVertex: Vertex;

    @Output() onChanged = new EventEmitter<{ 'arrival': Arrival, 'save': boolean }>();

    initValues: Arrival = new Arrival(new Interval(), new Interval());

    ngOnInit() {
        this.initValues.vertexInterval.begin = this.beginTime ;
        this.initValues.vertexInterval.end = this.endTime;
        this.initValues.vertex = this.selectedVertex;
    }

    reset() {
        this.beginTime = this.initValues.vertexInterval.begin;
        this.endTime = this.initValues.vertexInterval.end;
        this.selectedVertex = this.initValues.vertex;
    }

    save() {
        this.onChanged.emit({ 
            'arrival': new Arrival(new Interval(this.beginTime, this.endTime), new Interval(), this.selectedVertex, null), 
            'save': true 
        });
    }

    discard() {
        this.reset();
        this.onChanged.emit({ 'arrival': this.initValues, 'save': false });
    }
}