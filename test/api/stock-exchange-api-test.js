import chai from 'chai';
import chaiHttp from 'chai-http';
import app from 'appRoot/app';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('stock exchange api acceptance test', () => {
    describe('index', () => {
        it('should return 200', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    }
                );
        });
    });
});