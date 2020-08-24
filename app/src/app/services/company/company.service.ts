import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiCommon, StockHistoricalData, StockRange, StockIntradayData, StockEarningParameters } from '../../shared-ressources/apiParameters';

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
      StockIntradayData.baseUrl + "?" + ApiCommon.tokenKeyTest;

    return this.http.get(url);
  }

  /**
   * Returns an array of possible companies matching the fragment.
   * @param fragment Can be the name of a company or its symbol.
   */
  searchForCompany(fragment: string) {
    // example url: https://sandbox.iexapis.com/stable/search/tesla?token=Tpk_72893886b1a34cfd99fe3769cc8b7fd3
    let url = ApiCommon.baseTestUrl + ApiCommon.stableVersion + "search/" + fragment + "?" + ApiCommon.tokenKeyTest;
    return this.http.get(url);
  }

  getEarnings(symbol: string, numYears: number = 1) {
    // /stock/{symbol}/earnings/{last}?period=annual
    let url = ApiCommon.baseTestUrl + ApiCommon.stableVersion + ApiCommon.stock + symbol + "/" + 
          StockEarningParameters.baseUrl + numYears  + "?" + ApiCommon.tokenKeyTest + StockEarningParameters.period; 
    console.log(url)
    return this.http.get(url);
  }
}
