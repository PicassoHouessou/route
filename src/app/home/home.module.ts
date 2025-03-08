import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { ReservationModule } from '../reservation/reservation.module';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzStepsModule } from 'ng-zorro-antd/steps';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,NzButtonModule,NzIconModule,NzStepsModule,NzDropDownModule,NzAvatarModule,RouterModule,ReservationModule,NzListModule,NzTypographyModule
  ],
})
export class HomeModule { }
