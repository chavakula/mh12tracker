import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from  '@angular/common/http';
import * as appGlobals from '../globals';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  baseApiUrl = appGlobals.SETTINGS.baseApiUrl;
  metaApiUrl: string = appGlobals.SETTINGS.metaApiUrl;
  newsApiUrl: string = appGlobals.SETTINGS.newsApiUrl;
  summaryApiUrl: string = appGlobals.SETTINGS.summaryApiUrl;
  wardWiseApiUrl: string = appGlobals.SETTINGS.wardWiseApiUrl;
  summaryTimeseriesApiUrl: string = appGlobals.SETTINGS.summaryTimeseriesApiUrl;

  constructor(private httpClient: HttpClient) { }

  /**
   * Get Meta Details
  **/
  getMetaDetails(): Observable<any>{
    let API_URL = `${this.baseApiUrl}${this.metaApiUrl}`;
    return this.httpClient.get(API_URL)
      .pipe(
        catchError(this.error)
      )
  }
  /**
   * Get news ITEM from Exposed API
  **/
  getNewsItems(): Observable<any>{
    let API_URL = `${this.baseApiUrl}${this.newsApiUrl}`;
    return this.httpClient.get(API_URL)
      .pipe(
        catchError(this.error)
      )
  }

  /**
   * Get Summary details
  */

  getSummaryDetails(): Observable<any>{
    let API_URL = `${this.baseApiUrl}${this.summaryApiUrl}`;
    return this.httpClient.get(API_URL)
      .pipe(
        catchError(this.error)
      )
  }

  /**
   * Get all cases ward wise
  */

  getWardWiseCases(): Observable<any>{
    let API_URL = `${this.baseApiUrl}${this.wardWiseApiUrl}`;
    return this.httpClient.get(API_URL)
      .pipe(
        catchError(this.error)
      )
  }

  /**
   * Get time series for graph
  */

  getSummaryTimeseries(): Observable<any>{
    let API_URL = `${this.baseApiUrl}${this.summaryTimeseriesApiUrl}`;
    return this.httpClient.get(API_URL)
      .pipe(
        catchError(this.error)
      )
  }


  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
