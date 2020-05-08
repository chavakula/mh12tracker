import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor() { }
  testingSummary: any = {};
  ngOnInit(): void {
  }

  @Input() summary: any;
   
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'summary': {
            let chng = changes[propName];
            if(chng.currentValue){
              this.testingSummary = chng.currentValue;
            }
          }
        }
      }
    }
  }

}
