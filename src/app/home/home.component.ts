import { Component, inject, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthService } from '../auth/auth.service';
import { ApiServiceService } from '../api-service.service';
import { commercial_modes as Commercial } from '../interfaces/dtos/api';
import { Auth, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[NzButtonModule,NzIconModule]
})
export class HomeComponent implements OnInit {

  constructor(private readonly authService:AuthService,private readonly apiService : ApiServiceService,
     private readonly router:Router){
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
        //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      console.log(aUser);
      this.email=aUser?.email;
    })
  }

  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;

  email:string | null | undefined='inconnu';

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
}
