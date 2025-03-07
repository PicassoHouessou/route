import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenStreetMapService {

  constructor(@Inject('OPEN_STREET_MAP_URL') private readonly openStreetMapUrl:string,private readonly httpClient:HttpClient) { }

  getInfos(adresse:string){
    return this.httpClient.get<any>(`${this.openStreetMapUrl}`,{
      params: {
        q: adresse,
        format: "json",
        addressdetails: 1,
        limit: 1
    }
    })
  }
}
