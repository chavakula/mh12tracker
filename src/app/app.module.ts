import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TrackerComponent } from './components/tracker/tracker.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TrackerService } from './shared/tracker.service';
import { HttpClientModule } from '@angular/common/http';
import { TimePipe } from './shared/time.pipe';
import { DatePipe } from '@angular/common'
import { AppConfigService } from './shared/app-config.service';

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    TrackerComponent,
    HeaderComponent,
    FooterComponent,
    TimePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [TrackerService,DatePipe,AppConfigService,{ provide: APP_INITIALIZER, useFactory: appInitializerFn, deps: [AppConfigService], multi: true, }],
  bootstrap: [AppComponent]
})
export class AppModule { }
