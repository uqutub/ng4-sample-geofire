import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './root/app.component';
import { MapComponent } from './map/map';
import { AddRiderComponent } from './add-rider/add-rider';
import { BookRiderComponent } from './book-rider/book-rider';

import { FirebaseService } from './service/firebase';

import { AgmCoreModule } from '@agm/core';

import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyB8zGRIvkL51bANLk9ys-dMOkScKbgD8kI',
  authDomain: 'sample-geofire.firebaseapp.com',
  databaseURL: 'https://sample-geofire.firebaseio.com',
  projectId: 'sample-geofire',
  storageBucket: 'sample-geofire.appspot.com',
  messagingSenderId: '983355545155'
});

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AddRiderComponent,
    BookRiderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyANauVHoWAYfUV0AthNQBz1ZRJjO9wGPYk'
    })
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
