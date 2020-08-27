import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiCommon, StockHistoricalData, StockIntradayData, StockEarningParameters } from '../../shared-ressources/apiParameters';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getHistoricalStockData(symbol: string, range: string) {
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
    let url = ApiCommon.baseTestUrl + ApiCommon.stableVersion + "search/" + fragment + "?" + ApiCommon.tokenKeyTest;
    return this.http.get(url);
  }

  getEarnings(symbol: string, numYears: number = 1) {
    // /stock/{symbol}/earnings/{last}?period=annual
    let url = ApiCommon.baseTestUrl + ApiCommon.stableVersion + ApiCommon.stock + symbol + "/" + 
          StockEarningParameters.baseUrl + numYears  + "?" + ApiCommon.tokenKeyTest + StockEarningParameters.period; 
    return this.http.get(url);
  }
}
