import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { OpenStreetMapService } from '../open-street-map.service';
import { catchError, EMPTY, map } from 'rxjs';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {

  private fb = inject(NonNullableFormBuilder);
  private apiService=inject(ApiServiceService);
  private readonly osm:OpenStreetMapService=inject(OpenStreetMapService);
  private deaparture:string='';
  private destination:string='';
  validateForm = this.fb.group({
    deaparture: this.fb.control('Paris', [Validators.required]),
    destination: this.fb.control('Lyon', [Validators.required]),
    date:this.fb.control(Timestamp.now().toDate()),
    hour:this.fb.control(Timestamp.now().toDate()),
  });

  alternatives=[];
  @Output() trajets:EventEmitter<any[]>=new EventEmitter();

  loading=false;

  submitForm() : void{
    if (this.validateForm.valid) {
      this.loading=true;
      const tmp_date=new Date(this.validateForm.get<string>('date')?.value as string);
      console.log(this.validateForm.get<string>('hour')?.value);
      const tmp_date2=(new Date(this.validateForm.get<string>('hour')?.value as string));
      tmp_date.setHours(tmp_date2.getHours());
      tmp_date.setMinutes(tmp_date2.getMinutes());
      tmp_date.setSeconds(tmp_date2.getSeconds());
      tmp_date.setMilliseconds(tmp_date2.getMilliseconds());

      this.setDeaparture(this.validateForm.get<string>('deaparture')?.value as string);
      this.setDestination(this.validateForm.get<string>('destination')?.value as string);
      const datetime=tmp_date.toLocaleString().split(' ')[0].split('/').reverse().join('')+'T'+tmp_date.toLocaleString().split(' ')[1].split(':').join('');
      setTimeout(()=>{
        console.log(this.deaparture,this.destination);
        if (this.deaparture && this.destination) {
          this.apiService.getTrajets({from:this.deaparture,
            to:this.destination,
            datetime:datetime})
            .subscribe(value=>{
              this.trajets.emit(value.journeys);
              this.loading=false;
            })
        }
      },5000)
    }
  }

  setDeaparture(adresse:string){
    this.osm.getInfos(adresse)
    .pipe(
      map(value=>value[0]),
      catchError(error=>EMPTY)
    )
    .subscribe(value=>{
      if (value && value.lat) {
        this.deaparture=`${value.lon};${value.lat}`;
      }
    });
  }

  setDestination(adresse:string){
    this.osm.getInfos(adresse)
    .pipe(
      map(value=>value[0]),
      catchError(error=>EMPTY)
    )
    .subscribe(value=>{
      if (value && value.lat) {
        this.destination=`${value.lon};${value.lat}`;
      }
    });
  }
}
