import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';



@NgModule({
  declarations: [
    ReservationComponent
  ],
  imports: [
    CommonModule,NzFormModule,ReactiveFormsModule,NzButtonModule,NzInputModule,NzDatePickerModule,NzCardModule,NzTimePickerModule,NzAutocompleteModule
  ],
  exports:[ReservationComponent]
})
export class ReservationModule { }
