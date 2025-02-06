import {Inject, Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
constructor(@Inject('sncfApiKey') private sncfApiKey: string,@Inject('sncfBaseUrl') private sncfBaseUrl: string, private httpClient: HttpClient) {
}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     const url= req.url;
     console.log(url);
      if (url.startsWith(this.sncfBaseUrl)) {
        console.log("Here",url);
        // Clone the request and add the Authorization header
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `${this.sncfApiKey}`,
          },
        });
        return next.handle(clonedRequest);
      }

    return next.handle(req); // If no token, proceed without modification
  }
}
