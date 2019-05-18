import { IEXClient } from 'iex-api';
import FetchPonyfill from 'fetch-ponyfill';

const fetch = FetchPonyfill().fetch;
const iexClient = new IEXClient(fetch);

const stockInfoService = {};

stockInfoService.getMarketPrice = async (symbol) => {
    let quoteData = await iexClient.stockQuote(symbol);
    return quoteData.latestPrice;
};

module.exports = stockInfoService;