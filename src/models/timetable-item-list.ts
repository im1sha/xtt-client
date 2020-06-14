import { TimetableItem } from './timetable-item';

export class TimetableItemList {
    constructor(
        public isOk?: boolean,
        public items?: Array<{'key': string, 'value': TimetableItem[]}>) { }        
}