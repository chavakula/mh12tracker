import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from  '@angular/common/http';
import * as appGlobals from '../globals';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  dt: Date =  new Date();
  epoch: Number =  this.dt.getTime();
  baseApiUrl = appGlobals.SETTINGS.baseApiUrl;
  metaApiUrl: string = appGlobals.SETTINGS.metaApiUrl+"?v="+this.epoch;
  newsApiUrl: string = appGlobals.SETTINGS.newsApiUrl+"?v="+this.epoch;
  summaryApiUrl: string = appGlobals.SETTINGS.summaryApiUrl+"?v="+this.epoch;
  wardWiseApiUrl: string = appGlobals.SETTINGS.wardWiseApiUrl+"?v="+this.epoch;
  summaryTimeseriesApiUrl: string = appGlobals.SETTINGS.summaryTimeseriesApiUrl+"?v="+this.epoch;
  summaryDeltaGraphApiUrl: string = appGlobals.SETTINGS.summaryDeltaGraph+"?v="+this.epoch;
  zoneApi: string = appGlobals.SETTINGS.zoneApiUrl;
  nearByApiUrl: string = appGlobals.SETTINGS.nearByApiUrl;
  patientSummaryApiUrl: string = appGlobals.SETTINGS.patientSummary+"?v="+this.epoch;

  const;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  /**
   * Get Meta Details
  **/
 getPuneMetaData(): Observable<any>{
  let API_URL = "/assets/pune-meta-info.json?v="+this.epoch;
  return this.httpClient.get(API_URL)
    .pipe(
      catchError(this.error)
    )
}

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

  /**
   * Get time series for delta graph
  */

 getSummaryDeltaGraph(): Observable<any>{
  let API_URL = `${this.baseApiUrl}${this.summaryDeltaGraphApiUrl}`;
  return this.httpClient.get(API_URL)
    .pipe(
      catchError(this.error)
    )
}

  /**
   * get containment zone status GeoIQ api
   */

   getZoneStatus(lats: any): Observable<any>{
     const body = { latlngs: [lats], key: appGlobals.SETTINGS.apiKey};
     let API_URL = `${this.zoneApi}`;
     return this.httpClient.post(API_URL,body,this.httpOptions)
     .pipe(
       catchError(this.error)
     );
   }

   /**
   * get Near by containment zone status GeoIQ api
   */

  getNearByAreas(lng: any, lat: any): Observable<any>{
    const body = { lng: lng, lat: lat, radius: appGlobals.SETTINGS.nearByRadius, key: appGlobals.SETTINGS.apiKey};
    let API_URL = `${this.nearByApiUrl}`;
    return this.httpClient.post(API_URL,body,this.httpOptions)
    .pipe(
      catchError(this.error)
    );
  }

   /**
   * Get patient summary
  */

  getSummaryPatients(): Observable<any>{
    let API_URL = `${this.baseApiUrl}${this.patientSummaryApiUrl}`;
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
