import '@babel/polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from 'appRoot/app';
import db from 'persistence/model';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('stock exchange api acceptance test', () => {

    let apiBase = '/api/v1/';

    /**
     * Clean up the transaction table before we start.
     */
    before((done) => {
        db.Transaction.sync({force: true}).then(() => done());
    });

    it('creating and finding transactions should work as expected', async () => {
        // create a few transactions
        let createPath = apiBase + 'transaction';
        let stockSymbol = 'GOOG';
        let numTransactions = 3;
        let transactionIdentifiers = [];
        for (var i = 0; i < numTransactions; i++) {
            // do the thing
            let result = await chai.request(app)
                .post(createPath)
                .send({'symbol' : stockSymbol, 'currencyUnit' : 'USD', 'amount' : Number(100)});

            // some basic validation
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.be.a('object');

            // validate specific properties
            // identifier
            result.body.should.have.property('identifier');
            result.body.identifier.should.be.not.empty;

            // symbol
            result.body.should.have.property('symbol');
            result.body.symbol.should.equal(stockSymbol);

            // shares
            result.body.should.have.property('shares');
            result.body.shares.should.be.greaterThan(0);

            // remember the identifier for later
            transactionIdentifiers.push(result.body.identifier);
        }

        // fetch all transactions
        let findAllPath = apiBase + 'transaction';
        let fetchAllResult = await chai.request(app)
            .get(findAllPath);

        // some basic validation of "fetch all"
        fetchAllResult.should.have.status(200);
        fetchAllResult.body.should.be.an('array');
        fetchAllResult.body.length.should.equal(numTransactions);
        fetchAllResult.body[0].identifier.should.not.be.empty;

        // fetch transaction by identifier
        let findByIdentifierPath = apiBase + 'transaction/id/' + transactionIdentifiers[0];
        let fetchByIdentifierResult = await chai.request(app)
            .get(findByIdentifierPath);

        // some basic validation of "fetch by identifier"
        fetchByIdentifierResult.should.have.status(200);
        fetchByIdentifierResult.body.should.be.an('object');
        fetchByIdentifierResult.body.identifier.should.equal(transactionIdentifiers[0]);

        // fetch transactions by symbol
        let findBySymbolPath = apiBase + 'transaction/symbol/' + stockSymbol;
        let fetchBySymbolResult = await chai.request(app)
            .get(findBySymbolPath);
        fetchBySymbolResult.should.have.status(200);
        fetchBySymbolResult.body.should.be.an('array');
        fetchBySymbolResult.body.length.should.equal(numTransactions);
    });

    it('find transaction with bogus identifier should result in a 404', async () => {
        // fetch transaction by identifier
        let findByIdentifierPath = apiBase + 'transaction/id/totally-bogus';
        let fetchByIdentifierResult = await chai.request(app)
            .get(findByIdentifierPath);

        // some basic validation of "fetch by identifier"
        fetchByIdentifierResult.should.have.status(404);
    });

    it('find transaction with bogus symbol should result in an empty array', async () => {
        // fetch transaction by identifier
        let findBySymbolPath = apiBase + 'transaction/symbol/totally-bogus';
        let fetchBySymbolResult = await chai.request(app)
            .get(findBySymbolPath);

        // some basic validation of "fetch by symbol"
        fetchBySymbolResult.should.have.status(200);
        fetchBySymbolResult.body.should.be.an('array');
        fetchBySymbolResult.body.length.should.equal(0);
    });

});