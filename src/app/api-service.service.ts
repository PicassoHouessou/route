import {Inject, Injectable} from '@angular/core';
import {catchError, EMPTY, map, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiRoutesWithoutPrefix} from "../config/constant";
import { commercial_modes, ReservetionDto } from './interfaces/dtos/api';

@Injectable({
    providedIn: 'root',
})
export class ApiServiceService {
     constructor(@Inject('sncfBaseUrl') private sncfBaseUrl: string, private httpClient: HttpClient) {
    }

    getLines() {
        return this.httpClient.get(`${this.sncfBaseUrl}/${ApiRoutesWithoutPrefix.COVERAGE_SANDBOX_LINES}`).pipe(
            map((values) => values),
            catchError((error) => EMPTY)
        );
    }

    getCommercialModes() {
       return this.httpClient.get<commercial_modes[]>(`${this.sncfBaseUrl}/${ApiRoutesWithoutPrefix.COMMERCIAL_MODES}`).pipe(
           map((values) => values),
           catchError((error) => of(error))
       );
    }

    getTrajets(reservationInfo:ReservetionDto){
        return this.httpClient.get<any>(`${this.sncfBaseUrl}/${ApiRoutesWithoutPrefix.JOURNEYS}?from=admin:fr:${reservationInfo.from}&to=admin:fr:${reservationInfo.to}&datetime=${reservationInfo.datetime}`);
        // return this.httpClient.get<any>(`https://api.sncf.com/v1/coverage/sncf/journeys?from=2.3483915;48.8534951&to=2.373481;48.844945&datetime=20250302T104252`)
    }
}
