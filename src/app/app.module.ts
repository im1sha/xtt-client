import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ListComponent } from './list.component';
import { FileComponent } from './file.component'; 
import { PathComponent } from './path.component';
import { TripComponent } from './trip.component';
import { NotFoundComponent } from './not-found.component';
import { ArrivalListComponent } from './arrival-list.component';
import { TripUploadComponent } from './trip-upload.component';
import { VertexAddComponent } from './vertex-add.component';
import { TripArgCreateComponent } from './trip-arg-create.component';
import { ArrivalEditComponent } from './arrival-edit.component';
import { TripGroupComponent } from './trip-group.component';
import { TripGroupUploadComponent } from './trip-group-upload.component';
import { TripListComponent } from './trip-list.component';

const appRoutes: Routes = [
    { path: '', component: ListComponent },
    { path: 'file', component: FileComponent },
    { path: 'path', component: PathComponent },
    { path: 'trip', component: TripComponent },
    { path: 'trip-group', component: TripGroupComponent },
    //{ path: 'edit/:id', component: ProductEditComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
    declarations: [
        AppComponent, 
        ListComponent,
        FileComponent,
        PathComponent, 
        TripComponent,
        NotFoundComponent, 
        ArrivalListComponent,
        TripUploadComponent,
        VertexAddComponent,
        TripArgCreateComponent,
        ArrivalEditComponent,
        TripGroupComponent, 
        TripGroupUploadComponent,
        TripListComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }