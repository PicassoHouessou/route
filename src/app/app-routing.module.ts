import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import {  AuthGuard, redirectUnauthorizedTo,redirectLoggedInTo } from '@angular/fire/auth-guard'; 
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';


const redirectLoggedInToHome = () => redirectLoggedInTo(['']);
const redirectUnauthorizedToLanding = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:HomeComponent,
    canActivate:[AuthGuard],
    data:{
      authGuardPipe: redirectUnauthorizedToLanding
    },
    title:'Page d\'accueil'
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full',
    canActivate:[AuthGuard],
    data:{
      authGuardPipe: redirectLoggedInToHome
    },
    title:'Se connecter'
  },
  {
    path:'register',
    component:RegisterComponent,
    pathMatch:'full',
    title:'S\'inscrire'
  },
  {
    path:'profil',
    component:ProfileComponent,
    pathMatch:'full',
    title:'Profile'
  },
  {
    path:'confirm-email',
    component:ConfirmEmailComponent,
    pathMatch:'full',
    title:'ConfirmEmail'
  },
  {
    path:'**',
    component:NotFoundComponent,
    pathMatch:'full',
    title:'Non trouver'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
