import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiCommon, StockHistoricalData } from '../../shared-ressources/apiParameters';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getStockHistoricalData(symbol: string, range: string) {
    // const test = "https://cloud.iexapis.com/stable/stock/aapl/chart/1m?chartCloseOnly=true&token=pk_eaea0df3c02d4133b244ce7b0034b8f0"

    let url = ApiCommon.baseTestUrl + ApiCommon.stableVersion + StockHistoricalData.baseUrl +
     symbol + "/" + StockHistoricalData.chart + range + "?" + StockHistoricalData.chartCloseOnly + "&" + ApiCommon.tokenKeyTest;
    console.log(url);
    return this.http.get(url);
  }
}
