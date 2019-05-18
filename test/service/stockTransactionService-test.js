import '@babel/polyfill';
import TransactionRequest from 'service/type/transactionRequest';
import stockTransactionService from 'service/stockTransactionService';
import db from 'persistence/model';

describe('stock transaction service', () => {
    describe('buy', () => {
        it('should succeed and store a transaction', async () => {
            // buy a stock
            let buyResult = await stockTransactionService.buy(new TransactionRequest('AAPL', 'BUY', 'USD', 100));

            // directly fetch the transaction with the given identifier
            let findByIdentifierResult = await db.Transaction.findAll({
                where : {
                    identifier: buyResult.identifier
                }
            });
            findByIdentifierResult.should.not.be.null;
            findByIdentifierResult.length.should.equal(1);
            findByIdentifierResult[0].identifier.should.equal(buyResult.identifier);
            findByIdentifierResult[0].shares.should.be.a('number');
            findByIdentifierResult[0].shares.should.be.greaterThan(0);
            findByIdentifierResult[0].stockSymbol.should.equal('AAPL');
            findByIdentifierResult[0].stockAmount.should.equal(100);
        });
    });
});