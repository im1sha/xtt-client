import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vertex } from '../models/vertex';
import { Edge } from '../models/edge';

@Injectable()
export class SchemeGetService {

    private edgeUrl = "/api/edge";
    private vertexUrl = "/api/vertex";

    constructor(private http: HttpClient) {
    }

    getVertices() {
        return this.http.get(this.vertexUrl);
    }

    getVertex(id: string) {
        return this.http.get(this.vertexUrl + '/' + id);
    }

    getEdges() {
        return this.http.get(this.edgeUrl);
    }

    getEdge(id: string) {
        return this.http.get(this.edgeUrl + '/' + id);
    }
}