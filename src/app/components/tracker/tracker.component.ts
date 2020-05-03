import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { TrackerService } from '../../shared/tracker.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  public isCollapsed = false;
  confirmChart = [];
  confirmData = [];
  labels = [];

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

  wardWiseCases: any = {};
  wardWiseLoading: Boolean = true;

  constructor(private dataservice: TrackerService) { }

  // Init all Charts & fetch Data
  ngOnInit(): void {

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
    this.dataservice.getSummaryTimeseries().subscribe(data=>{
      // populate timeseries data for active,death,confirm,recovered
      data.forEach(row => {
          this.labels.push(row.Date);
          this.confirmData.push(row.Confirmed);
          this.activeData.push(row.Active);
          this.deathData.push(row.Death);
          this.recoverData.push(row.Recovered);
      });

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
                pointRadius: 0,
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
                display: false
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
                pointRadius: 0,
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
                display: false
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
                pointRadius: 0,
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
                display: false
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
                pointRadius: 0,
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
                display: false
              }],
              yAxes: [{
                display: false
              }],
            }
          }
      });
    });
  }
  // end of init function

}
