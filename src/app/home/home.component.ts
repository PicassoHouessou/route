import { Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ApiServiceService } from '../api-service.service';
import { commercial_modes as Commercial, JourneyItem } from '../interfaces/dtos/api';
import { Auth, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { parseDate } from '../../config/util.date';
import { StatistiqueService } from '../statistique/statistique.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy {

  currentTraject:JourneyItem |null =null;

  choise($traject: JourneyItem) {
    this.currentTraject=$traject;
  }

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    // this.statService.addStat({})
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  @ViewChild(TemplateRef) button: TemplateRef<unknown> | undefined;

parseDate(arg0: string|undefined): string{
  return parseDate(arg0!).toString();
}


  constructor(private readonly authService:AuthService,private readonly apiService : ApiServiceService,
     private readonly router:Router,private readonly statService:StatistiqueService){
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
  trajets:JourneyItem[]=[];

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
