import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors} from "@angular/common/http";
import {requestInterceptor} from "./auth.interceptor";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { DATE_PIPE_DEFAULT_OPTIONS, registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeModule } from './home/home.module';
import { StatistiqueModule } from './statistique/statistique.module';
import { ProfileModule } from './profile/profile.module';
import { IconsProviderModule } from '@/app/icons-provider.module';

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    IconsProviderModule,
    BrowserModule,
    AppRoutingModule,
    ProfileModule,
    AuthModule,
    HomeModule,ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp({
      "projectId":"route-b52d9",
      "appId":"1:1077626078503:web:dc907a4199b98b198b5502",
      "storageBucket":"route-b52d9.firebasestorage.app",
      "apiKey":"AIzaSyBI_zlW_mOR1sUX-SiAmMPe0KctPuQXRO4",
      "authDomain":"route-b52d9.firebaseapp.com",
      "messagingSenderId":"1077626078503"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FormsModule,
    RouterModule,
    StatistiqueModule
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
      provide:'API_URL',
      useValue:'https://api.navitia.io/v1/coverage/sncf'
    },
    provideHttpClient(withInterceptors([requestInterceptor])),
    { provide: NZ_I18N, useValue: fr_FR },
    provideHttpClient(),
    {provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: {timezone: 'UTC+1'}},
    {provide:LOCALE_ID,useValue:'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
