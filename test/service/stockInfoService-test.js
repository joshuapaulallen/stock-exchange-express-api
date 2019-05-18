import '@babel/polyfill';
import stockInfoService from 'service/stockInfoService';

/**
 * A small test that verifies the IEX library.
 */
describe('stock info service', () => {
    it('should fetch stock price', async () => {
        let price = await stockInfoService.getMarketPrice('AAPL');
        price.should.not.be.null;
        price.should.be.greaterThan(0);
    });
});