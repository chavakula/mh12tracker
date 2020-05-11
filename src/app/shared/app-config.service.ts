import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as appGlobals from '../globals';

@Injectable()
export class AppConfigService {
    private appConfig;

    constructor(private http: HttpClient) {
    }

    loadAppConfig() {
        var date = new Date();
        let epoch = date.getTime();
        return this.http.get('/assets/config/config.json?v='+epoch)
            .toPromise()
            .then(data => {
                this.appConfig = data;
                // initialize global variables
                appGlobals.SETTINGS.baseApiUrl = data["baseApiUrl"];
                appGlobals.SETTINGS.metaApiUrl = data["metajson"];
                appGlobals.SETTINGS.newsApiUrl = data["newsjson"];
                appGlobals.SETTINGS.summaryApiUrl = data["summaryjson"];
                appGlobals.SETTINGS.wardWiseApiUrl = data["wardjson"];
                appGlobals.SETTINGS.summaryTimeseriesApiUrl = data["summarygraphs"];
                appGlobals.SETTINGS.zoneApiUrl = data["zoneApiUrl"];
                appGlobals.SETTINGS.apiKey = data["apiKey"];
                appGlobals.SETTINGS.summaryDeltaGraph = data["summaryDeltaGraph"];
                appGlobals.SETTINGS.nearByApiUrl = data["nearByApiUrl"];
                appGlobals.SETTINGS.nearByRadius = data["nearByRadius"];
            });
    }

    getConfig() {
        return this.appConfig;
    }

}
