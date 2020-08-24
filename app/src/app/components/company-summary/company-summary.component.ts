import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ApiCommon, StockHistoricalData } from '../../shared-ressources/apiParameters.js';
import { CompanyService } from '../../services/company/company.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-company-summary',
  templateUrl: './company-summary.component.html',
  styleUrls: ['./company-summary.component.css']
})
export class CompanySummaryComponent implements OnInit {

  @Input() symbol: string;
  @ViewChild("chartCanvas") canvasRef: ElementRef;

  canvasClass: string;

  chart: any[];
  
  constructor(
    private elementRef: ElementRef,
    private companyService: CompanyService
    ) { }

  ngOnInit(): void {
    this.canvasClass = "canvas-" + this.symbol;

    this.companyService.getStockHistoricalData(this.symbol, StockHistoricalData.oneMonth)
        .subscribe(
          response => {
          this.setupChart(response);
        },
        error => {
          this.symbol = "Error finding : " + this.symbol;
          console.log(`Error getting stock info for ${this.symbol}:\n${error}`);
        });
  }

  setupChart(data) {
    let chartData = [], dates = [];

    data.forEach(day => {
      dates.push(day.date);
      chartData.push({
        t: day.date,
        y: day.close
      });
    });

    let canvasElement = document.getElementsByClassName(this.canvasClass); // TODO: angular advise against using document directly
    this.chart = new Chart(canvasElement[0], {
      type: 'line',
      data: {
        lablels: dates,
        datasets: [
          {
            data: chartData,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time'
          }]
        }
      }
    });
  }
}
