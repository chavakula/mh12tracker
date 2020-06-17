import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { TrackerService } from 'src/app/shared/tracker.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-patient-stats',
  templateUrl: './patient-stats.component.html',
  styleUrls: ['./patient-stats.component.css']
})
export class PatientStatsComponent implements OnInit {

  constructor(private dataservice: TrackerService,private datePipe: DatePipe) { }
  
  confirmChart: any = {};
  postiveChart: any = {};
  icuChart: any = {};
  venChart: any = {};
  patientsummaryLoading: boolean = true;
  labels = [];
  tests = [];
  positives = [];
  icuadmits = [];
  venadmits = [];

  ngOnInit(): void {
    // get patient summary
    this.dataservice.getSummaryPatientsGraph().subscribe(data=>{
      
      data.forEach(item => {
        this.labels.push(this.datePipe.transform(item.Date, 'dd-MMM'));
        this.tests.push(item.DeltaTests);
        this.positives.push(item.DeltaPostive);
        this.icuadmits.push(item.DeltaICU);
        this.venadmits.push(item.DeltaVentilator);
      });

      // sample testing Data
      this.confirmChart = new Chart('confirmstats', {
        type: 'bar',
        data: {
        labels: this.labels,
        datasets: [
          {
            data: this.tests,
            backgroundColor: "#ccc",
          }
          ]
        },
        options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
      });


      // postive patients Data
      this.postiveChart = new Chart('postivechart', {
        type: 'bar',
        data: {
        labels: this.labels,
        datasets: [
          {
            data: this.positives,
            backgroundColor: "#ff073a",
          }
          ]
        },
        options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
      });

      // ICU patient Data
      this.icuChart = new Chart('icuchart', {
        type: 'bar',
        data: {
        labels: this.labels,
        datasets: [
          {
            data: this.icuadmits,
            backgroundColor: "#fd7e14",
          }
          ]
        },
        options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
      });

      // Ventilator patient Data
      this.venadmits = new Chart('venchart', {
        type: 'bar',
        data: {
        labels: this.labels,
        datasets: [
          {
            data: this.venadmits,
            backgroundColor: "#000",
          }
          ]
        },
        options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
      });

      /*

      var gdata = {

        labels: this.labels,
        datasets: [{
          type: 'line',
          label: 'Swab Tests',
          borderColor: '#ccc',
          borderWidth: 2,
          fill: false,
          data: this.tests,
        }, {
          type: 'line',
          label: 'Postives Patients',
          data: this.positives,
          borderColor: '#ff073a',
          borderWidth: 2,
          fill: false,
        }, {
          type: 'line',
          label: 'ICU Admits',
          borderColor: '#fd7e14',
          data:  this.icuadmits,
          borderWidth: 2,
          fill: false,
        },
        {
          type: 'line',
          label: 'Ventilator Support',
          borderColor: '#000',
          data:  this.venadmits,
          borderWidth: 2,
          fill: false,
        }]
      };

      this.confirmChart = new Chart('confirmstats', {
        type: 'bar',
				data: gdata,
				options: {
					responsive: true,
					title: {
						display: true,
						text: 'Testing Vs Postives Vs ICU Vs Ventilator'
					},
					tooltips: {
						mode: 'index',
						intersect: true
					}
				}
      });*/

      this.patientsummaryLoading = false;
    });
  }

}
