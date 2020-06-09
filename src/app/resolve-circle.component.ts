import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ResolveCircleService } from 'src/services/resolve-circle.service';
import { PathModel } from 'src/models/path-model';


@Component({
    selector: 'resolve-circle-comp',
    templateUrl: './resolve.component.html',
    providers: [ResolveCircleService],
})
export class ResolveCircleComponent {

    constructor(private circleService: ResolveCircleService) { }
    readonly header: string = "Circle move resolver";
    readonly downloadUrl: string = '/api/download/';
    
    readonly conflictText: string = 'There\'re 5 conflicting trip groups';
    readonly resolveText: string = 'There\'s no conflicts';

    pathToFinalDownload: string;
    pathToInitialDownload: string;

    createVersion() {
        this.circleService.postInitialFile()
            .subscribe((data: PathModel) => {
                this.pathToInitialDownload = data?.ok
                    ? data?.url
                    : null;
            });
    }
    
    resolve() {
        this.circleService.postFinalFile()
            .subscribe((data: PathModel) => {
                this.pathToFinalDownload = data?.ok
                    ? data?.url
                    : null;
            });
    }
}
