import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import {  AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard'; 
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';


const redirectUnauthorizedToLanding = () => redirectUnauthorizedTo(['login']); 
const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:HomeComponent,
    canActivate:[AuthGuard],
    data:{
      authGuardPipe: redirectUnauthorizedToLanding
    }
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'register',
    component:RegisterComponent,
    pathMatch:'full'
  },
  {
    path:'profile',
    component:ProfileComponent,
    pathMatch:'full'
  },
  {
    path:'**',
    component:NotFoundComponent,
    pathMatch:'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
