import { Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ApiServiceService } from '../api-service.service';
import { commercial_modes as Commercial, CustomType, JourneyItem, SectionItem } from '../interfaces/dtos/api';
import { Auth, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { formatDate, parseDate } from '../../config/util.date';
import { HistoricService } from '../statistique/statistique.service';
import { DATE_FORMAT } from '@/config/constant';
import { presetColors } from 'ng-zorro-antd/core/color';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
interface InfoType {
  departure?: string; destination?: string;
  startDate?: string;
}
@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
   infos: InfoType = {};
  readonly presetColors = presetColors;
   getInfos($event: InfoType) {
      this.infos = $event;
   }

   currentTraject: JourneyItem | null = null;

   choise($event: MouseEvent, $traject: JourneyItem) {
      $event.stopPropagation();
      this.currentTraject = $traject;
      this.dialog.open(this.current_itineraire,{
         width:"50%",
         height:"50%",
         exitAnimationDuration:"500ms",
         enterAnimationDuration:"500ms"
      });
   }

   isVisible = false;

   showModal(): void {
      this.isVisible = true;
   }

   handleOk(): void {
      this.hisService.addStat({
         destination: this.infos.destination,
         depart: this.infos.departure,
         startDate: this.infos.startDate,
      });
      this.dialog.closeAll();
   }

   handleCancel(): void {
      this.dialog.closeAll();
   }

   @ViewChild('button') button: TemplateRef<unknown> | undefined;
   @ViewChild('current_itineraire') current_itineraire!: TemplateRef<any>;

   parseDate(arg0: string | undefined) {
      return parseDate(arg0!);
   }

   constructor(
      private readonly authService: AuthService,
      private readonly apiService: ApiServiceService,
      private readonly router: Router,
      private readonly hisService: HistoricService,
      private readonly dialog:MatDialog
   ) {
      this.userSubscription = this.user$.subscribe((aUser: User | null) => {
         this.email = aUser?.email;
      });
   }
   ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
   }

   private auth: Auth = inject(Auth);
   user$ = user(this.auth);
   userSubscription: Subscription;

   email: string | null | undefined = 'inconnu';

   trajets2: CustomType[] = [];

   regions: Commercial[] = [];
   ngOnInit() {
      try {
         this.apiService.getCommercialModes().subscribe((data) => {
            this.regions = data.commercial_modes;
         });
      } catch (error) {
         console.error(error);
      }
   }

   get getUrl(): string {
      return this.router.url;
   }

   async logOut() {
      try {
         await this.authService.logOut();
         this.router.navigateByUrl('/login');
      } catch (error) {
         console.log(error);
      }
   }

   formatDuration(seconds:number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return [hours, minutes]
      .map(unit => String(unit).padStart(2, '0'))
      .join('h');
  }

  getDescription(section:SectionItem){
   return this.formatDuration(section.duration);
  }

  getHeader({ item:traject }: CustomType) {
      if (!traject) {
         return '';
      }
      let title = this.formatDuration(traject?.duration!);
      return `${title}`;
   }

   getTraject($event: any[]) {
      this.trajets2 = $event.map((t) => ({ item: {...t,price:Math.random()*150}, visible: false }));
      console.log($event);
      this.trajets2[0].visible = true;
   }

   protected readonly DATE_FORMAT = DATE_FORMAT;
   protected readonly formatDate = formatDate;
}
