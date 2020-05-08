import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TrackerService } from '../../shared/tracker.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  puneMeta: any = {};
  totalTest: number = 0;
  recoveryRate: number = 0;
  deathRate: number = 0;
  infectionRate: number = 0;
  puneMetaData: any = [];
  testingSummary: any = [];
  constructor(private dataservice: TrackerService) { }

  @Input() patients: any;
  @Input() summarydetails: any;
  changelog: string[] = [];
  ngOnInit(): void {
    
    this.dataservice.getPuneMetaData().subscribe(data=>{
       this.puneMeta = data;

       let totaltests = this.patients.PatientSummary[0].TotalTests;
       this.totalTest = (totaltests*100)/this.puneMeta.pmcpopulation;

       this.recoveryRate = ((this.summarydetails.DistrictCases[0].Recovered)*100)/this.summarydetails.DistrictCases[0].Confirmed;
       this.deathRate = ((this.summarydetails.DistrictCases[0].Death)*100)/this.summarydetails.DistrictCases[0].Confirmed;
       this.infectionRate = ((this.summarydetails.DistrictCases[0].Confirmed)*100)/this.puneMeta.pmcpopulation;
    });
  }
}
