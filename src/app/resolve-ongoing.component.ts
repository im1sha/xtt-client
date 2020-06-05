import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { ResolveOngoingService } from 'src/services/resolve-ongoing.service';
import { PathModel } from 'src/models/path-model';
@Component({
    selector: 'resolve-ongoing-comp',
    templateUrl: './resolve.component.html',
    providers: [],
})
export class ResolveOngoingComponent {

    constructor(private ongoingService: ResolveOngoingService) { }
    header: string;
    readonly downloadUrl: string = '/api/download/';
    pathToFinalDownload: string;
    pathToInitialDownload: string;

    createVersion() {
        this.ongoingService.postInitialFile()
            .subscribe((data: PathModel) => {
                this.pathToInitialDownload = data?.ok
                    ? data?.url
                    : null;
            });
    }
    
    resolve() {
        this.ongoingService.postFinalFile()
            .subscribe((data: PathModel) => {
                this.pathToFinalDownload = data?.ok
                    ? data?.url
                    : null;
            });
    }
}