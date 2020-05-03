import { Component, OnInit } from '@angular/core';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbAlertConfig]
})
export class AppComponent implements OnInit{
  title = 'mh12tracker';


  constructor(alertConfig: NgbAlertConfig) {
    alertConfig.type = 'warning';
    alertConfig.dismissible = false;
  }

  ngOnInit() {

  }

}
