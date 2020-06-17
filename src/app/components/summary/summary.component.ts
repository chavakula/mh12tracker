import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TrackerService } from 'src/app/shared/tracker.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(private dataservice: TrackerService,private modalService: NgbModal,) { }
  testingSummary: any = {};
  puneMeta: any = {};
  ngOnInit(): void {
    this.dataservice.getPuneMetaData().subscribe(data=>{
      this.puneMeta = data;
   });

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

  // model test
  openScrollableContent(trendContent) {
    this.modalService.open(trendContent, { scrollable: true });
  }

}
