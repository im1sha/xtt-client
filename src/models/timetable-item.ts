export class TimetableItem {
    constructor(
        public vertexId?:string,
        public beginTime?: number,
        public endTime?: number,
        public tripBeginVertexId?: string,
        public tripEndVertexId?: string,
        public tripName?: string, 
        public tripGroupName?: string) { }        
}