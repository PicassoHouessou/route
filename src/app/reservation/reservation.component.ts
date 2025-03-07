import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { AutoCompleteItem } from '../interfaces/dtos/api';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit{
  ngOnInit(): void {
    this.apiService.getCoordonnee('paris').subscribe(value=>{
      this.options_deaparture=value.pt_objects;
    });
    this.apiService.getCoordonnee('calais').subscribe(value=>{
          this.options_destination=value.pt_objects;
        });
  }

  private fb = inject(NonNullableFormBuilder);
  private apiService=inject(ApiServiceService);
  validateForm = this.fb.group({
    deaparture: this.fb.control('Paris', [Validators.required]),
    destination: this.fb.control('Calais', [Validators.required]),
    date:this.fb.control(Timestamp.now().toDate()),
    hour:this.fb.control(Timestamp.now().toDate()),
  });

  alternatives=[];
  @Output() trajets:EventEmitter<any[]>=new EventEmitter();

  loading=false;
  options_deaparture: AutoCompleteItem[] = [];
  options_destination: AutoCompleteItem[] = [];

  getString(coord:any){
    return `${coord?.lon};${coord?.lat}`;
  }

  onInputDeaparture(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.apiService.getCoordonnee(value).subscribe(value=>{
        this.options_deaparture=value.pt_objects;
      });
    }
    this.options_deaparture = value ? this.options_deaparture.filter(v=>v.name?.includes(value)) : [];
  }

  onInputDestination(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.apiService.getCoordonnee(value).subscribe(value=>{
        this.options_destination=value.pt_objects;
      });
    }
    this.options_destination = value ? this.options_destination.filter(v=>v.name?.includes(value)) : [];
  }




  submitForm() : void{
    if (this.validateForm.valid) {
      this.loading=true;
      const tmp_date=new Date(this.validateForm.get<string>('date')?.value as string);
      const tmp_date2=(new Date(this.validateForm.get<string>('hour')?.value as string));
      tmp_date.setHours(tmp_date2.getHours());
      tmp_date.setMinutes(tmp_date2.getMinutes());
      tmp_date.setSeconds(tmp_date2.getSeconds());
      tmp_date.setMilliseconds(tmp_date2.getMilliseconds());
      const datetime=tmp_date.toLocaleString().split(' ')[0].split('/').reverse().join('')+'T'+tmp_date.toLocaleString().split(' ')[1].split(':').join('');
      const deaparture=this.getString(this.options_deaparture.find(v=>v.name?.includes(this.validateForm.get<string>('deaparture')?.value as string))?.stop_area?.coord);
      const destination=this.getString(this.options_destination.find(v=>v.name?.includes(this.validateForm.get<string>('destination')?.value as string))?.stop_area?.coord);
      if (deaparture && destination) {
        this.apiService.getTrajets({from:deaparture,
          to:destination,
          datetime:datetime})
          .pipe(
            catchError(error=>{
            this.loading=false;
              return EMPTY;
            })
          )
          .subscribe(value=>{
            this.trajets.emit(value.journeys??[]);
            this.loading=false;
          })
      }
    }
  }
}
