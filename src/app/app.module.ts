import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ListComponent } from './list.component';
import { FileComponent } from './file.component';
import { PathComponent } from './path.component';
import { NotFoundComponent } from './not-found.component';

import { TripComponent } from './trip-items/trip.component';
import { ArrivalListComponent } from './trip-items/arrival-list.component';
import { TripUploadComponent } from './trip-items/trip-upload.component';
import { VertexAddComponent } from './trip-items/vertex-add.component';
import { TripArgCreateComponent } from './trip-items/trip-arg-create.component';
import { ArrivalEditComponent } from './trip-items/arrival-edit.component';

import { TripGroupComponent } from './trip-group-items/trip-group.component';
import { TripGroupUploadComponent } from './trip-group-items/trip-group-upload.component';
import { TripListComponent } from './trip-group-items/trip-list.component';
import { TripEditComponent } from './trip-group-items/trip-edit.component';

import { VersionComponent } from './version-items/version.component';
import { VersionUploadComponent } from './version-items/version-upload.component';
import { TripGroupListComponent } from './version-items/trip-group-list.component';
import { TripGroupEditComponent } from './version-items/trip-group-edit.component';

import { ResolveCircleComponent } from './resolve-circle.component';

import { ResolveOngoingComponent } from './resolve-ongoing.component';

import {TimetableComponent} from './timetable.component';
import {TimetableUploadComponent} from './timetable-upload.component';

const appRoutes: Routes = [
    { path: '', component: ListComponent },
    { path: 'file', component: FileComponent },
    { path: 'path', component: PathComponent },
    { path: 'trip', component: TripComponent },
    { path: 'trip-group', component: TripGroupComponent },
    { path: 'version', component: VersionComponent },
    { path: 'resolve-circle', component: ResolveCircleComponent },
    { path: 'resolve-ongoing', component: ResolveOngoingComponent },
    { path: 'timetable', component: TimetableComponent},
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
    declarations: [
        AppComponent,
        ListComponent,
        FileComponent,
        PathComponent,
        NotFoundComponent,

        TripComponent,
        ArrivalListComponent,
        TripUploadComponent,
        VertexAddComponent,
        TripArgCreateComponent,
        ArrivalEditComponent,

        TripGroupComponent,
        TripGroupUploadComponent,
        TripListComponent,
        TripEditComponent,

        VersionComponent,
        VersionUploadComponent,
        TripGroupListComponent,
        TripGroupEditComponent,

        ResolveCircleComponent,
        ResolveOngoingComponent,

        TimetableComponent,
        TimetableUploadComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }