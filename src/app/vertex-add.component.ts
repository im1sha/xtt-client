import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Vertex } from 'src/models/vertex';

@Component({
    selector: 'vertex-add',
    templateUrl: './vertex-add.component.html',
})
export class VertexAddComponent {

    @Output() onChanged = new EventEmitter<Vertex[]>();
    @Input() allVertices: Vertex[];
    @Input() header: string = "";
    @Input() list: Vertex[] = [];
    temp: Vertex = new Vertex();

    add() {
        if (!this.list.some(item => item === this.temp)) {
            this.list.push(this.temp);
            this.onChanged.emit(this.list);
        }
    }

    drop(p: Vertex) {
        let index = this.list.findIndex((el) => el === p);
        if (index > -1) {
            this.list.splice(index, 1);
        }
    }
}

