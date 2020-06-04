import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Trip } from 'src/models/trip';
import { TripGroup } from 'src/models/trip-group';

@Component({
    selector: 'trip-group-edit',
    templateUrl: './trip-group-edit.component.html',
})
export class TripGroupEditComponent {

    @Input() header: string;
    @Input() tripGroup: TripGroup;
    @Output() onChanged = new EventEmitter<{ 'tripGroup': TripGroup, 'save': boolean }>();
    initValues: TripGroup;

    ngOnInit() {
        this.initValues = this.tripGroup;
    }

    reset() {
        this.tripGroup = this.initValues;
    }

    save() {
        this.onChanged.emit({
            'tripGroup': this.tripGroup,
            'save': true
        });
    }

    discard() {
        this.reset();
        this.onChanged.emit({ 'tripGroup': this.initValues, 'save': false });
    }
}