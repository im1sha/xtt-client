import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TripGroup } from 'src/models/trip-group';

@Component({
    selector: 'trip-list',
    templateUrl: './trip-list.component.html',
})
export class TripListComponent {

    @Input() tripGroup: TripGroup;

   
}
