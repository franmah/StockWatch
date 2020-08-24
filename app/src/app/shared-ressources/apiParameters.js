const ApiCommon = {
    baseUrl: "https://cloud.iexapis.com/",
    baseTestUrl: "https://sandbox.iexapis.com/",
    tokenKey: "token=pk_eaea0df3c02d4133b244ce7b0034b8f0",
    tokenKeyTest: "token=Tpk_72893886b1a34cfd99fe3769cc8b7fd3",
    stableVersion: "stable/"
}

const StockRange = {
    oneMonth: "1m",
    sixMonth: "6m",
    oneYear: "1y",
    fiveYears: "5y",
    today: "today"
}
const StockHistoricalData = {
    baseUrl: "stock/",
    chart: "chart/",
    chartCloseOnly: "chartCloseOnly=true",
}

const StockIntradayData = {
    baseUrl: "intraday-prices/"
}

module.exports = {
    ApiCommon,
    StockRange,
    StockHistoricalData,
    StockIntradayData
};