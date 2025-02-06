import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from "./api-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'route';

  regions:any;
  ngOnInit() {
    try {
      this.apiService.getCommercialModes().subscribe((data)=>{
        this.regions=data;
        console.log(this.regions.commercial_modes);
      });
    } catch (error) {
      console.error(error);
    }
  }

  constructor(private readonly apiService : ApiServiceService) {

  }
}
