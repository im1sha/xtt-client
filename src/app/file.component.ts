import { Component, OnInit } from '@angular/core';
import { FilesService } from '../services/files.service';
import { FileModel } from '../models/file-model';

@Component({
    selector: 'file-comp',
    templateUrl: './file.component.html',
    providers: [FilesService]
})
export class FileComponent implements OnInit {

    file: FileModel = new FileModel();
    files: FileModel[];
    tableMode: boolean = true;

    constructor(private dataService: FilesService) { }

    ngOnInit() {
        this.load();
    }
    load() {
        this.dataService.getFiles()
            .subscribe((data: FileModel[]) => this.files = data);
    }
    save() {
        if (this.file.id == null) {
            this.dataService.createFile(this.file)
                .subscribe((data: FileModel) => this.files.push(data));
        } else {
            this.dataService.updateFile(this.file)
                .subscribe(data => this.load());
        }
        this.cancel();
    }
    editFile(p: FileModel) {
        this.file = p;
    }
    cancel() {
        this.file = new FileModel();
        this.tableMode = true;
    }
    dropFile(p: FileModel) {
        this.dataService.deleteFile(p.id)
            .subscribe(data => this.load());
    }
    addFile() {
        this.cancel();
        this.tableMode = false;
    }
}
