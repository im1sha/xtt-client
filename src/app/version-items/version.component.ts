import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Version } from 'src/models/version';
import { VersionService } from 'src/services/version.service';
import { PathModel } from 'src/models/path-model';

@Component({
    selector: 'version-comp',
    templateUrl: './version.component.html',
    providers: [VersionService],
})
export class VersionComponent implements OnInit , OnChanges {

    readonly versionUploadHeader: string = "Version from xml";

    version: Version = new Version([]);

    readonly downloadUrl: string = '/api/download/';
    pathToDownload: string = null;

    constructor(private versionService: VersionService) { }


    restoreLinks(v: Version) {
        if (!v) {
            v = new Version([]);
        }
        else if (!v.tripGroups) {
            v.tripGroups = [];
        }

        this.version.name = v.name;
        this.version.tripGroups = v.tripGroups;
    }

    ngOnInit() {
        // this.restoreLinks(this.version);
    }

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            if (propName === 'version') {
                let newVal: Version = changes[propName].currentValue;
                this.restoreLinks(newVal);
            }
        }
    }

    uploadFile(event: Version) {
        if(!event || !event.tripGroups) {
            event = new Version([]);
        }
        this.version = event;
        console.log(event);
    }

    convertToFile() {
        this.versionService
            .postFileByVersion(this.version)
            .subscribe((data: PathModel) => {
                this.pathToDownload = data?.ok
                    ? data?.url
                    : null;
            });
    }
}
