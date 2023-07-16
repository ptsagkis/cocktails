import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from "rxjs/operators";
import { CocktailsdbService } from '../services/cocktailsdb.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private cocktailsdbService:CocktailsdbService) {
  }

  /**
   * @p.tsagkis handle the errors globally. 
   * 
   * -- handle the http errors glabally
   * -- set loading to true before request
   * -- set loading to false on error
   * 
   * we may share the this.cocktailsdbService.apiError 
   * among components if we want to display api call errors
   * @param request 
   * @param next 
   * @returns 
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      return next.handle(request).pipe(
        tap( _ => this.cocktailsdbService.apiLoading = true),
        tap( _ => this.cocktailsdbService.apiError = null),
        catchError((error) => {
            if (error instanceof ErrorEvent) {
                console.log('This is client side error');
                this.cocktailsdbService.apiLoading = false;
                this.cocktailsdbService.apiError = `Error: ${error.error.message}`;
            } else {
                console.log('This is server side error');
                this.cocktailsdbService.apiLoading = false;
                this.cocktailsdbService.apiError = `Error Code: ${error.status},  Message: ${error.message}`;
            }
            return throwError(() => error);
        })
        );
    }
}