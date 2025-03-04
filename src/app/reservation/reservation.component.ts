import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {

  private fb = inject(NonNullableFormBuilder);
  private apiService=inject(ApiServiceService);
  validateForm = this.fb.group({
    deaparture: this.fb.control(75056, [Validators.required]),
    destination: this.fb.control(69123, [Validators.required]),
    date:this.fb.control(Timestamp.now().toDate()),
    hour:this.fb.control(Timestamp.now().toDate()),
  });

  alternatives=[];
  @Output() trajets:EventEmitter<any[]>=new EventEmitter();

  submitForm(): void {
    if (this.validateForm.valid) {
      const tmp_date=new Date(this.validateForm.get<string>('date')?.value as string);
      console.log(this.validateForm.get<string>('hour')?.value);
      const tmp_date2=(new Date(this.validateForm.get<string>('hour')?.value as string));
      tmp_date.setHours(tmp_date2.getHours());
      tmp_date.setMinutes(tmp_date2.getMinutes());
      tmp_date.setSeconds(tmp_date2.getSeconds());
      tmp_date.setMilliseconds(tmp_date2.getMilliseconds());
      const datetime=tmp_date.toLocaleString().split(' ')[0].split('/').reverse().join('')+'T'+tmp_date.toLocaleString().split(' ')[1].split(':').join('');
      this.apiService.getTrajets({from:this.validateForm.get<string>('deaparture')?.value as string,
        to:this.validateForm.get<string>('destination')?.value as string,
        datetime:datetime})
        .subscribe(value=>this.trajets.emit(value.journeys))
    }
  }
}
