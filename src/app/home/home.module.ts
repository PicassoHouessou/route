import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReservationModule } from '../reservation/reservation.module';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import {  NzTagModule } from 'ng-zorro-antd/tag';
import { IconsProviderModule } from '../icons-provider.module';
import {  MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import {MatStepperModule} from '@angular/material/stepper';


 @NgModule({
    declarations: [HomeComponent,HeaderComponent],
    imports: [
       IconsProviderModule,
       CommonModule,
       NzModalModule,
       NzCollapseModule,
       NzButtonModule,
       RouterOutlet,
       NzBreadCrumbModule,
       NzLayoutModule,
       NzMenuModule,
       NzIconModule,
       NzStepsModule,
       NzDropDownModule,
       NzAvatarModule,
       RouterModule,
       ReservationModule,
       NzListModule,
       NzTypographyModule,
       NzTagModule,
       MatIconModule,NzGridModule,MatStepperModule
    ],
 })
 export class HomeModule {}
