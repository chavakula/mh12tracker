import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { formatDate } from '@angular/common';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbAlertConfig]
})
export class AppComponent implements OnInit{
  title = 'mh2tracker';
  public isCollapsed = false;
  today= new Date();
  jstoday = '';

  confirmChart = [];
  activeChart = [];
  recoverChart = [];
  deathChart = [];

  constructor(alertConfig: NgbAlertConfig) {
    this.jstoday = formatDate(this.today, 'dd/MM/yyyy hh:mm:ss a', 'en-US', '+0530');
    alertConfig.type = 'warning';
    alertConfig.dismissible = false;
  }

  ngOnInit() {

    this.confirmChart = new Chart('confirm', {

         type: 'line',
         data: {
          labels: ["1", "2", "3", "4", "5","6","7","8","9"],
          datasets: [
            {
              data: [10,10,12,13,14,2,5,8,10],
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


    this.activeChart = new Chart('active', {

         type: 'line',
         data: {
          labels: ["1", "2", "3", "4", "5","6","7","8","9"],
          datasets: [
            {
              data: [12,30,20,21,26,24,29,15,19],
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

    this.recoverChart = new Chart('recover', {

         type: 'line',
         data: {
          labels: ["1", "2", "3", "4", "5","6","7","8","9"],
          datasets: [
            {
              data: [12,30,20,21,26,24,29,15,19],
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

    this.deathChart = new Chart('death', {

         type: 'line',
         data: {
          labels: ["1", "2", "3", "4", "5","6","7","8","9"],
          datasets: [
            {
              data: [20,21,22,19,39,30,25,22,23],
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


  }

}
