import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { TrackerService } from '../../shared/tracker.service';
import { Observable } from 'rxjs/internal/Observable';
import { Meta } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  public isCollapsed = false;
  puneMetaData = [];
  confirmChart = [];
  confirmData = [];
  labels = [];
  points = [];
  zoneMessage = "";
  zoneType = "";
  zoneDistrict = "";
  zoneClass = "";
  zoneTitleMessage = "";
  districtInfoLoading: Boolean = true;
  controlHitRate = 1;
  staticAlertClosed = false;
  alertMessageContent: String = '';
  metaInformation: any = [];
  sline: any;

  activeChart = [];
  activeData = [];

  recoverChart = [];
  recoverData = [];

  deathChart = [];
  deathData = [];

  newsArticles: any = [];
  newsLoading: Boolean = true;

  summaryDetails: any = {};
  summaryLoading: Boolean = true;

  summaryPatients: any = {};
  summaryPatientsLoading: Boolean = true;

  wardWiseCases: any = {};
  wardWiseLoading: Boolean = true;

  graphLoading: Boolean = true;

  locationset = [];
  nearByAreas: string = "";
  nearByAreasLoading: Boolean = true;

  today: number = Date.now();
  demotest: any;

  constructor(private modalService: NgbModal, private dataservice: TrackerService, private metaService: Meta, private datePipe: DatePipe) {
  }

  // model test
  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  getLocation(): Observable<boolean> {
    this.locationset = [];
    this.districtInfoLoading = true;
    return new Observable(observer => {
      if(navigator){
            navigator.geolocation.getCurrentPosition( pos => {
            this.locationset.push(pos.coords.latitude);
            this.locationset.push(pos.coords.longitude);
            observer.next(true);
            observer.complete();
        });
      }else{
        observer.next(false);
        observer.complete();
      }
    });

  }

  /**
   * Function to call external service to check containment zone
  */

  checkZone(){
    this.getLocation().subscribe(success => {
      if(this.controlHitRate <= 5){

        this.dataservice.getNearByAreas(this.locationset[1],this.locationset[0]).subscribe(data=>{
          if(data.containmentsAvailability){
            this.nearByAreas = "<b>Containment Areas Around You : </b> <br>" + data.containmentZoneNames.join("<br>");
            this.nearByAreasLoading = false;
          } 
        })
        

        this.dataservice.getZoneStatus(this.locationset).subscribe(data =>{
          this.districtInfoLoading = false;
          let czone = data.data[0].containmentZoneName;
          let district = data.data[0].district;
          let districtZone = data.data[0].districtZoneType;
          let cflag = data.data[0].inContainmentZone;
          let caflag = data.data[0].containmentsAvailability;


          if(caflag){
              if(cflag){
                   this.zoneMessage = 'OOPS! You are in containment area <br>' +  czone;
              }else{
                   this.zoneMessage = 'Phew! You are not in containment area.';
              }
          }else{
             this.zoneMessage = 'Containment area information not available';
          }

          if(district != 'NA'){
             this.zoneDistrict = district;
             if(districtZone){
                this.zoneType = districtZone;

                // check for Orange Zone
                if(districtZone.indexOf( "Orange" ) >=0){
                  this.zoneClass = "icu";
                }
                
                // check for Red Zone
                if(districtZone.indexOf( "Red" ) >=0) {
                  this.zoneClass = "confirm";
                }
                
                // check for Green Zone
                if(districtZone.indexOf( "Red" ) < 0 && districtZone.indexOf( "Orange" ) < 0) {
                   this.zoneClass = "recovered";
                }  
             }
             this.zoneTitleMessage = "You are in " + district + ", a " + districtZone;
          }else{
             this.zoneTitleMessage = "District/City Information Not Available";
          }
          this.controlHitRate = this.controlHitRate + 1;
        });

      }else{
        this.locationset = [];
        this.districtInfoLoading = false;
        this.zoneMessage = 'You have reached the limit for single session';
      }
     }, error => {
       console.log("unable to receive co-ordinates");
     });
  }

  getMessage(data: String){
    this.alertMessageContent = data;
  }

  getMetaData(data: any){
    this.metaInformation = data;
  }

  get sortDataWardDesc() {
    return this.wardWiseCases.sort((a, b) => {
      return b.TotalConfirmed - a.TotalConfirmed;
    });
  }

  // Init all Charts & fetch Data
  ngOnInit(): void {  
    this.metaService.updateTag({
      content: 'Pune Corona virus update for ' + this.datePipe.transform(this.today, 'dd/MM/yyyy')
    },
     "property='twitter:title'"
    );

    this.metaService.updateTag({
      content: 'Pune Corona virus update for ' + this.datePipe.transform(this.today, 'dd/MM/yyyy')
    },
     "property='og:title'"
    );

    // dismiss alert
    setTimeout(() => this.staticAlertClosed = true, 20000);

    // get patient summary
    this.dataservice.getSummaryPatients().subscribe(data=>{
      this.summaryPatients = data;
      this.summaryPatientsLoading = false;
    });

    // get news
    this.dataservice.getNewsItems().subscribe(data=>{
      this.newsArticles = data;
      this.newsLoading = false;
    });

    // get Summary details
    this.dataservice.getSummaryDetails().subscribe(data=>{
       this.summaryDetails = data;
       this.summaryLoading = false;
    });

    // get ward wise details
    this.dataservice.getWardWiseCases().subscribe(data=>{
      this.wardWiseCases = data;
      this.wardWiseLoading = false;
    });

    // get data for graph
    this.dataservice.getSummaryDeltaGraph().subscribe(data=>{
      //setTimeout(function(){ console.log("log"); }, 3000);
      // populate timeseries data for active,death,confirm,recovered

      data.forEach(row => {
          this.labels.push(this.datePipe.transform(row.CreatedAt, 'dd-MMM'));
          this.confirmData.push(row.DeltaConfirmed);
          this.activeData.push(row.DeltaActive);
          this.deathData.push(row.DeltaDeath);
          this.recoverData.push(row.DeltaRecovered);
          this.points.push(0);
      });
      
      this.demotest = this.confirmData.toString();
    
      // to show last dot on graph
      this.points[this.points.length-1] = 1.5;
    
      // Confirm Data
      this.confirmChart = new Chart('confirm', {
           type: 'line',
           data: {
            labels: this.labels,
            datasets: [
              {
                data: this.confirmData,
                borderColor: '#ff073a',
                fill: false,
                pointRadius: this.points,
                borderWidth: 2.8
              }
             ]
            },
            options: {
            tooltips: {enabled: false},
            hover: {mode: null},
            padding: {
              bottom: 5,
              top:5,
              left: 5,
              right: 5
            },
            responsive: true,
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: false,
                offset: true
              }],
              yAxes: [{
                display: false
              }],
            }
          }
      });

      // active chart
      this.activeChart = new Chart('active', {
           type: 'line',
           data: {
            labels: this.labels,
            datasets: [
              {
                data: this.activeData,
                borderColor: '#007bff',
                fill: false,
                pointRadius: this.points,
                borderWidth: 2.8
              }
             ]
            },
            options: {
            tooltips: {enabled: false},
            hover: {mode: null},
            padding: {
              bottom: 5,
              top:5,
              left: 5,
              right: 5
            },
            responsive: true,
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: false,
                offset: true
              }],
              yAxes: [{
                display: false
              }],
            }
          }
      });

      // recovered charts
      this.recoverChart = new Chart('recover', {
           type: 'line',
           data: {
            labels: this.labels,
            datasets: [
              {
                data: this.recoverData,
                borderColor: '#28a745',
                fill: false,
                pointRadius: this.points,
                borderWidth: 2.8
              }
             ]
            },
            options: {
            tooltips: {enabled: false},
            hover: {mode: null},
            layout: {
              padding: {
                bottom: 5,
                top:5,
                left: 5,
                right: 5
              }
            },
            responsive: true,
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: false,
                offset: true
              }],
              yAxes: [{
                display: false
              }],
            }
          }
      });

      // death charts
      this.deathChart = new Chart('death', {
           type: 'line',
           data: {
            labels: this.labels,
            datasets: [
              {
                data: this.deathData,
                borderColor: '#6c757d',
                fill: false,
                pointRadius: this.points,
                borderWidth: 2.8
              }
             ]
            },
            options: {
            tooltips: {enabled: false},
            hover: {mode: null},
            padding: {
              bottom: 5,
              top:5,
              left: 5,
              right: 5
            },
            responsive: true,
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: false,
                offset: true
              }],
              yAxes: [{
                display: false
              }],
            }
          }
      });
      this.graphLoading = false;
    });
  }
  // end of init function

}
