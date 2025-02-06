import {Inject, Injectable} from '@angular/core';
import {catchError, EMPTY, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiRoutesWithoutPrefix} from "../config/constant";

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
       return this.httpClient.get(`${this.sncfBaseUrl}/${ApiRoutesWithoutPrefix.COMMERCIAL_MODES}`).pipe(
           map((values) => values),
           catchError((error) => of(error))
       );
    }
}
