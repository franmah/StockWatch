import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ApiCommon, StockHistoricalData, StockRange } from '../../shared-ressources/apiParameters.js';
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
  chart: any;
  symbolError: boolean = false;
  symbolText: string;
  
  
  constructor(
    private elementRef: ElementRef,
    private companyService: CompanyService
    ) { }

  ngOnInit(): void {
    this.canvasClass = "canvas-" + this.symbol;
    this.symbolText = this.symbol;

    this.getHistoricalCompanyData(StockRange.oneMonth);
  }

  /**
   * Update data range displayed when a button is clicked.
   * @param range 
   */
  updateRange(range: string): void {
    let isRangeValid = Object.keys(StockRange).some((key) => {
      return StockRange[key] === range;
    });

    if (isRangeValid) {
     if (range == StockRange.today) {
      this.getIntradayCompanyData();
     } else {
      this.getHistoricalCompanyData(range);
     }
    }
  }

  getIntradayCompanyData() {
    this.companyService.getIntradayStockData(this.symbol)
      .subscribe (
        response => {
          this.symbolText = this.symbol;
          this.setupIntradayChart(response);
        },
        error => {
          this.symbolText = "Error finding : " + this.symbol;
          this.symbolError = true;
          console.log(`Error getting intraday data for ${JSON.stringify(this.symbol)}: \n${JSON.stringify(error, null, 2)}`);
        }
      )
  }

  /**
   * Retrieve data from api and create chart.
   * Historical and intraday have different api end point.
   * @param range 
   */
  getHistoricalCompanyData(range: string) {
    this.companyService.getHistoricalStockData(this.symbol, range)
    .subscribe(
      response => {
        this.symbolText = this.symbol;
        this.setupHistoricalChart(response);
      },
      error => {
        this.symbolText = "Error finding : " + this.symbol;
        if (error.status === 429) {
          console.log("Error 429: too many requests too quickly")
          this.handleRequestLimitError(range);
        } else {
          console.log(`Error getting stock info for ${this.symbol}:\n${JSON.stringify(error, null, 2)}`);
        }
      });
  }

  /**
   * CHART HELPER FUNCTIONS
   */
  setupIntradayChart(data): void {
    let chartData = [], times = [];

    data.forEach(stockInfo => {
      times.push(stockInfo.label);
      chartData.push({
        t: new Date(stockInfo.date + "T" + stockInfo.minute),
        y: stockInfo.close
      });
    });

    this.createChart(chartData, times);
  }

  setupHistoricalChart(data): void {
    let chartData = [], dates = [];

    data.forEach(day => {
      dates.push(day.date);
      chartData.push({
        t: day.date,
        y: day.close
      });
    });

    this.createChart(chartData, dates);
  }

  createChart(data, labels) {
    this.clearChart();
    let canvasElement = document.getElementsByClassName(this.canvasClass); // TODO: angular advise against using document directly
    this.chart = new Chart(canvasElement[0], {
      type: 'line',
      data: {
        lablels: labels,
        datasets: [
          {
            data: data,
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

  clearChart() {
    if (this.chart) {
      this.chart.data.labels.pop();

      this.chart.data.datasets.forEach((dataset) => {
          let size = dataset.data.length;
          let i;
          for (i = 0; i < size; i++) {
            dataset.data.pop();
          }
      });
      this.chart.update();
      this.chart = null;
    }
  }

  /**
   * HTTP HELPER FUNCTIONS
   */

   /**
    * Try sending request to API after 10 milliseconds (time in between request)
    * @param range 
    */
   handleRequestLimitError(range: string) {
    setTimeout(() => {
      this.updateRange(range);
    }, 10);
   }
}