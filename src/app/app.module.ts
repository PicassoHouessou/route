import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./auth.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp({"projectId":"route-b52d9","appId":"1:1077626078503:web:dc907a4199b98b198b5502","storageBucket":"route-b52d9.firebasestorage.app","apiKey":"AIzaSyBI_zlW_mOR1sUX-SiAmMPe0KctPuQXRO4","authDomain":"route-b52d9.firebaseapp.com","messagingSenderId":"1077626078503"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: "sncfApiKey",
      useValue: "55e88c66-cf4c-49cc-a79c-566a72cbc539"
    },{
      provide:'sncfBaseUrl',
      useValue:'https://api.sncf.com/v1'
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
