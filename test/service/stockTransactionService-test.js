import '@babel/polyfill';
import TransactionRequest from 'service/type/transactionRequest';
import stockTransactionService from 'service/stockTransactionService';
import db from 'persistence/model';

describe('stock transaction service', () => {

    describe('buy', () => {

        /**
         * Clean up the transaction table before we start.
         */
        before((done) => {
            db.Transaction.sync({force: true}).then(() => done());
        });

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

    describe('finders', function () {

        // since setting up these preconditions takes a bit, bump the timeout up from the default of 2000 ms
        this.timeout(10000);

        let identifiers = [];
        let purchasesPerStock = 3;
        let stocks = ['AAPL', 'GOOG'];

        /**
         * Clean up the transaction table before we start, and then add some transactions.
         */
        before(async () => {
            // reset
            await db.Transaction.sync({force: true});

            // buy a few of each stocks
            for (var i = 0; i < stocks.length; i++) {
                let stockSymbol = stocks[i];
                for (var j = 0; j < purchasesPerStock; j++) {
                    let buyResult = await stockTransactionService.buy(new TransactionRequest(stockSymbol, 'BUY', 'USD', 100));
                    identifiers.push(buyResult.identifier);
                }
            }

            identifiers.length.should.equal(purchasesPerStock * stocks.length);
        });

        it('findAll should find all transactions', async () => {
            let findAllResults = await stockTransactionService.findAll();
            findAllResults.should.not.be.null;
            findAllResults.should.be.an('array');
            findAllResults.length.should.equal(identifiers.length);
        });

        it('findByIdentifier should find the specified transaction', async () => {
            let findByIdentifierResult = await stockTransactionService.findByIdentifier(identifiers[0]);
            findByIdentifierResult.should.not.be.null;
            findByIdentifierResult.identifier.should.equal(identifiers[0]);
            findByIdentifierResult.symbol.should.equal(stocks[0]);
        });

        it('findBySymbol should find all transactions with the given stock symbol', async () => {
            let findBySymbolResults = await stockTransactionService.findBySymbol(stocks[0]);
            findBySymbolResults.should.not.be.null;
            findBySymbolResults.should.be.an('array');
            findBySymbolResults.length.should.equal(purchasesPerStock);
        });

        it('findBySymbol should return an empty list if there are no such transactions', async () => {
            let findBySymbolResults = await stockTransactionService.findBySymbol('MSFT');
            findBySymbolResults.should.not.be.null;
            findBySymbolResults.should.be.an('array');
            findBySymbolResults.length.should.equal(0);
        });

    });
});