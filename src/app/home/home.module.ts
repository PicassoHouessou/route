import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,NzButtonModule,NzIconModule,RouterModule
  ]
})
export class HomeModule { }
