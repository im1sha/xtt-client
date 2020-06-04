import { Injectable } from '@angular/core';
import { Vertex } from 'src/models/vertex';
import { TripArg } from 'src/models/trip-arg';
import { Arrival } from 'src/models/arrival';

@Injectable()
export class LinkRestoreService {

    restoreVertexArray(allVertices: Vertex[], verticesToRestore: Vertex[]) {

        let result: Vertex[] = [];
        verticesToRestore?.forEach(element => {
            result.push(allVertices.find(i => i.id === element?.id));
        });
        return result;
    }

    restoreVertex(allVertices: Vertex[], vertexToRestore: Vertex) {
        return allVertices.find(i => i.id === vertexToRestore?.id);
    }


    // TODO: restore edges
    restoreTripVertices(allVertices: Vertex[], tripArg: TripArg, arrivals: Arrival[]) {
        if (!tripArg || !allVertices) return;

        if (tripArg.destination) {
            tripArg.destination
                = this.restoreVertex(
                    allVertices,
                    tripArg.destination);
        }
        if (tripArg.source) {
            tripArg.source
                = this.restoreVertex(
                    allVertices,
                    tripArg.source);
        }
        if (tripArg.forbiddenNodes) {
            tripArg.forbiddenNodes
                = this.restoreVertexArray(
                    allVertices,
                    tripArg.forbiddenNodes);
        }

        if (tripArg.requiredNodes) {
            tripArg.requiredNodes
                = this.restoreVertexArray(
                    allVertices,
                    tripArg.requiredNodes);
        }
        if (arrivals) {
            for (let index = 0; index < arrivals.length; index++) {
                if (arrivals[index] && arrivals[index].vertex) {
                    arrivals[index].vertex = this.restoreVertex(
                        allVertices,
                        arrivals[index].vertex);
                }
            }
        }
    }
}