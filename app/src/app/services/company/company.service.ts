import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiCommon, StockHistoricalData, StockRange, StockIntradayData } from '../../shared-ressources/apiParameters';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getHistoricalStockData(symbol: string, range: string) {
    // historical = "https://cloud.iexapis.com/stable/stock/aapl/chart/1m?chartCloseOnly=true&token=pk_eaea0df3c02d4133b244ce7b0034b8f0"
    // intraday = "https://sandbox.iexapis.com/stable/stock/aapl/intraday-prices?token=pk_eaea0df3c02d4133b244ce7b0034b8f0"
    
    let url = ApiCommon.baseTestUrl + ApiCommon.stableVersion + StockHistoricalData.baseUrl +
        symbol + "/" + StockHistoricalData.chart + range + "?" + StockHistoricalData.chartCloseOnly + "&" + ApiCommon.tokenKeyTest;
    
    return this.http.get(url);
  }

  getIntradayStockData(symbol: string) {
    let url = ApiCommon.baseTestUrl + ApiCommon.stableVersion + StockHistoricalData.baseUrl + symbol + "/" +
      StockIntradayData.baseUrl + "?" + ApiCommon.tokenKey;

    return this.http.get(url);
  }
}
