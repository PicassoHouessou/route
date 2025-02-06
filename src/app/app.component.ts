import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from "./api-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'route';
  ngOnInit() {
    this.apiService.getCommercialModes().subscribe((data)=>console.log(data));
  }

  constructor(private readonly apiService : ApiServiceService) {

  }
}
