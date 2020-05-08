import { Component, OnInit } from '@angular/core';
import { TrackerService } from '../../shared/tracker.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  today= new Date();
  jstoday = '';

  constructor(private dataservice: TrackerService) {
    //this.jstoday = formatDate(this.today, 'dd/MM/yyyy hh:mm:ss a', 'en-US', '+0530');
  }

  ngOnInit(): void {
    // get news
    this.dataservice.getMetaDetails().subscribe(data=>{
      if(data){
        this.jstoday = data.LastUpdateDateTime;
      }else{
        this.jstoday = '';
      }
    });
  }

}
