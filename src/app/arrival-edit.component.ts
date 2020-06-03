import { Component, EventEmitter, Input, Output } from '@angular/core';
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

    @Output() onSaved = new EventEmitter<Arrival>();

    result: Arrival = new Arrival(new Interval(), null, null, null);

    ngOnInit() {
        this.reset();
    }

    reset() {
        this.result.vertex = this.selectedVertex;
        this.result.vertexInterval.begin = this.beginTime;
        this.result.vertexInterval.end = this.endTime;
    }
    
    save() {
        this.onSaved.emit(this.result);
    }   

    discard(){
        this.reset();
        this.onSaved.emit(this.result);
    }
}