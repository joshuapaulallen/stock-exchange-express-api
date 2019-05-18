import '@babel/polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from 'appRoot/app';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe.skip('stock exchange api acceptance test', () => {

    let apiBase = '/api/v1/';

    describe('create transaction', () => {
        it('should succeed and return an appropriate response', async (done) => {
            let path = apiBase + 'transaction';
            let result = await chai.request(app)
                .put(path)
                .send({'symbol' : 'AAPL', 'currencyUnit' : 'USD', 'amount' : Number(100)});

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
            result.body.symbol.should.equal('AAPL');

            // shares
            result.body.should.have.property('shares');
            result.body.shares.should.be.greaterThan(0);

            done();
        });
    });

});