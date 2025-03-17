import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
