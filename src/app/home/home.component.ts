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
      this.isVisible = false;
   }

   handleCancel(): void {
      console.log('Button cancel clicked!');
      this.isVisible = false;
   }

   @ViewChild(TemplateRef) button: TemplateRef<unknown> | undefined;

   parseDate(arg0: string | undefined) {
      return parseDate(arg0!);
   }

   constructor(
      private readonly authService: AuthService,
      private readonly apiService: ApiServiceService,
      private readonly router: Router,
      private readonly hisService: HistoricService,
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
   return section?.display_informations?.commercial_mode??section.mode;
  }

  getHeader({ item:traject }: CustomType) {
      if (!traject) {
         return '';
      }
      let title = this.formatDuration(traject?.duration!);
      if (traject?.nb_transfers! > 0) {
        title = title+` ${traject?.nb_transfers} correspondances`;
      }
      return `${title}`;
   }

   getTraject($event: any[]) {
      this.trajets2 = $event.map((t) => ({ item: t, visible: false }));
      this.trajets2[0].visible = true;
   }

   protected readonly DATE_FORMAT = DATE_FORMAT;
   protected readonly formatDate = formatDate;
}
