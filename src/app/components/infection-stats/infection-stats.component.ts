import { Component, OnInit, Input } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-infection-stats',
  templateUrl: './infection-stats.component.html',
  styleUrls: ['./infection-stats.component.css']
})
export class InfectionStatsComponent implements OnInit {

  @Input() confirmData: any;
  @Input() activeData: any;
  @Input() recoverData: any;
  @Input() deathData: any;
  @Input() label: any;
  
  confirmChart: any = {};
  activeChart: any = {};
  recoverChart: any = {};
  deathChart: any = {};

  constructor() { }

  ngOnInit(): void {

   // Confirm Data
   this.confirmChart = new Chart('confirmstats', {
    type: 'bar',
    data: {
     labels: this.label,
     datasets: [
       {
         data: this.confirmData,
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


  // active Data
  this.activeChart = new Chart('activestats', {
    type: 'bar',
    data: {
     labels: this.label,
     datasets: [
       {
         data: this.activeData,
         backgroundColor: "#007bff",
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


  // recovered Data
  this.recoverChart = new Chart('recoverstats', {
    type: 'bar',
    data: {
     labels: this.label,
     datasets: [
       {
         data: this.recoverData,
         backgroundColor: "#28a745",
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

  // Death Data
  this.deathChart = new Chart('deathstats', {
    type: 'bar',
    data: {
     labels: this.label,
     datasets: [
       {
         data: this.deathData,
         backgroundColor: "#6c757d",
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



  }

}
