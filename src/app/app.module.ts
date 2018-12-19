import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';


var config = {
  apiKey: "AIzaSyASlGXooAyLdBGvzZjQwareHT7QqrILFuE",
  authDomain: "idea-submitter.firebaseapp.com",
  databaseURL: "https://idea-submitter.firebaseio.com",
  projectId: "idea-submitter",
  storageBucket: "idea-submitter.appspot.com",
  messagingSenderId: "82914807026"
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
