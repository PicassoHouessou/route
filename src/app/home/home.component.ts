import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ApiServiceService } from '../api-service.service';
import { commercial_modes as Commercial } from '../interfaces/dtos/api';
import { Auth, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy {


  constructor(private readonly authService:AuthService,private readonly apiService : ApiServiceService,
     private readonly router:Router){
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      this.email=aUser?.email;
    });
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;

  email:string | null | undefined='inconnu';
  trajets:any[]=[];

  regions:Commercial[]=[];
  ngOnInit() {
    try {
      this.apiService.getCommercialModes().subscribe((data)=>{
        this.regions=data.commercial_modes;
      });
    } catch (error) {
      console.error(error);
    }
  }

  async logOut(){
    try{
      await this.authService.logOut();
      this.router.navigateByUrl('/login');
    }catch(error){
      console.log(error);
    }
  }

  getTraject($event: any[]) {
    this.trajets=$event;
  }
}
