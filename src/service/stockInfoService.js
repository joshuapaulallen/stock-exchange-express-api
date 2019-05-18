import { IEXClient } from 'iex-api';
import FetchPonyfill from 'fetch-ponyfill';

const fetch = FetchPonyfill().fetch;
const iexClient = new IEXClient(fetch);

const stockInfoService = {};

/**
 * Fetch the latest market price for the stock with the given symbol.
 *
 * @param symbol {string} the stock symbol, e.g., "AAPL"
 * @returns {Promise<number>} The market price, in USD.
 */
stockInfoService.getMarketPrice = async (symbol) => {
    let quoteData = await iexClient.stockQuote(symbol);
    return quoteData.latestPrice;
};

module.exports = stockInfoService;