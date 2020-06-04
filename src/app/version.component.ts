import { Component, OnInit } from '@angular/core';
import { Version } from 'src/models/version';
import { VersionService } from 'src/services/version.service';
import { PathModel } from 'src/models/path-model';

@Component({
    selector: 'version-comp',
    templateUrl: './version.component.html',
    providers: [VersionService],
})
export class VersionComponent implements OnInit {

    readonly versionUploadHeader: string = "Version from xml";

    version: Version = new Version([]);

    readonly downloadUrl: string = '/api/download/';
    pathToDownload: string = null;

    constructor(private versionService: VersionService) { }

    ngOnInit() { }

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
