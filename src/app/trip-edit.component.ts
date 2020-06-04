import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Trip } from 'src/models/trip';

@Component({
    selector: 'trip-edit',
    templateUrl: './trip-edit.component.html',
})
export class TripEditComponent {

    @Input() header: string;
    @Input() trip: Trip;
    @Output() onChanged = new EventEmitter<{ 'trip': Trip, 'save': boolean }>();
    initValues: Trip;

    ngOnInit() {
        this.initValues = this.trip;
    }

    reset() {
        this.trip = this.initValues;
    }

    save() {
        this.onChanged.emit({
            'trip': this.trip,
            'save': true
        });
    }

    discard() {
        this.reset();
        this.onChanged.emit({ 'trip': this.initValues, 'save': false });
    }
}