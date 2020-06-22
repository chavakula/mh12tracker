import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { TrackerService } from '../../shared/tracker.service';
import { Observable } from 'rxjs/internal/Observable';
import { Meta } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as d3 from "d3";

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
      let cdata = [];
      let adata = [];
      let rdata = [];
      let ddata = [];

      data.forEach(row => {
          this.labels.push(this.datePipe.transform(row.CreatedAt, 'dd-MMM'));
          this.confirmData.push(row.DeltaConfirmed);
          this.activeData.push(row.DeltaActive);
          this.deathData.push(row.DeltaDeath);
          this.recoverData.push(row.DeltaRecovered);
          //this.points.push(0);

          // D3 sparkline
          cdata.push({date: row.CreatedAt, value: row.DeltaConfirmed});
          adata.push({date: row.CreatedAt, value: row.DeltaActive});
          rdata.push({date: row.CreatedAt, value: row.DeltaRecovered});
          ddata.push({date: row.CreatedAt, value: row.DeltaDeath});

      });
      
      this.demotest = this.confirmData.toString();

      //////////////////////////////

      this.drawSparklines(80, 40, "path1", ".sparkline-wrapper-confirmed",cdata, "confirmpath");
      this.drawSparklines(80, 40, "path2", ".sparkline-wrapper-active",adata, "activepath");
      this.drawSparklines(80, 40, "path3", ".sparkline-wrapper-recover",rdata, "recoverpath");
      this.drawSparklines(80, 40, "path4", ".sparkline-wrapper-death",ddata, "deathpath");

      //////////////////////////////
    
      this.graphLoading = false;
    });
  }
  // end of init function



  // d3 sparkline function
  drawSparklines(width: number, height: number, pathid: string, svgid: string, data: any, css: string){
    
    var margin = {top: 10, right: 10, bottom: 10, left: 0};
    var parseTime = d3.timeParse("%B %d, %Y");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var y_min = d3.min(data, function(d) { return d.value });
    var y_max = d3.max(data, function(d) { return d.value });
    
    var datestart = d3.min(data, function(d) { return new Date(d.date); });
		var dateend = d3.max(data, function(d) { return new Date(d.date); });

    x.domain([datestart, dateend]);
		y.domain([y_min, y_max]);
    
    // define the line
    var valueline = d3.line().curve(d3.curveMonotoneX)
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); });

    var svg = d3.select(svgid).append("svg")
									.attr("width", width + margin.left + margin.right)
									.attr("height", height + margin.top + margin.bottom)
									.append("g")
									.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // format the data
    data.forEach(function(d) {
      d.date = new Date(d.date);
      d.value = +d.value;
    });

    // Add the valueline path.
    svg.append("path")
      .datum(data)
      .attr("id",pathid)
      .attr("class", css)
      .attr("d", valueline);

      // calculate length of path
      var totalLength = d3.select("#"+pathid).node().getTotalLength();
      
      // set animation
      d3.select("#"+pathid)
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 2);
      
      // append circle at end
      svg.append('circle')
      .attr('class', 'sparkcircle')
      .attr('cx', x(data[data.length-1].date))
      .attr('cy', y(data[data.length-1].value))
      .style("opacity",0)
      .attr('r', 2);  

      // enable opacity after line animation completes
      svg.select(".sparkcircle").transition().delay(2000).duration(1000/1.5).style("opacity",1);

  }

}
