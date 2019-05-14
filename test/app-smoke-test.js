let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('smoke test', function() {
    describe('index', function() {
        it('should return 200', function() {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.include('')
                        done();
                    }
                );
        });
    });
});