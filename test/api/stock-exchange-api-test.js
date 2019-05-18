import chai from 'chai';
import chaiHttp from 'chai-http';
import app from 'appRoot/app';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe.skip('stock exchange api acceptance test', () => {

    let apiBase = '/api/v1/';

    describe('create transaction', () => {
        it('should succeed and return an appropriate response', (done) => {
            let path = apiBase + 'transaction';
            let result = chai.request(app)
                .put(path)
                .send({'symbol' : 'AAPL', 'currencyUnit' : 'USD', 'amount' : Number(100)})
                .end((err, res) => {
                    // some basic validation
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');

                    // validate specific properties
                    // identifier
                    res.body.should.have.property('identifier');
                    res.body.identifier.should.be.not.empty;

                    // symbol
                    res.body.should.have.property('symbol');
                    res.body.symbol.should.equal('AAPL');

                    // shares
                    res.body.should.have.property('shares');
                    res.body.shares.should.be.greaterThan(0);

                    done();
                });
        });
    });

});