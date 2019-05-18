import '@babel/polyfill';
import db from 'persistence/model';

/**
 * A test to play with the Sequelize library.  This verifies simple CRUD functionality on our Transaction model.
 */
describe('create/read/update/delete on transaction model', () => {

    /**
     * Clean up the transaction table before we start.
     */
    before((done) => {
        db.Transaction.sync({force: true}).then(() => done());
    });

    /**
     * Now, run a bunch of CRUD tests.
     */
    it('should successfully CRUD transactions', async () => {
        // insert a couple of transactions
        let firstIdentifier = 'abcd';
        let firstStockSymbol = 'AAPL';
        let firstCreateResult = await db.Transaction.create({
            identifier: firstIdentifier,
            transactionType: 'BUY',
            stockSymbol: firstStockSymbol,
            stockAmount: 100,
            shares: 1
        });
        firstCreateResult.should.not.be.null;
        let secondIdentifier = 'efgh';
        let secondStockSymbol = 'GOOG';
        let secondCreateResult = await db.Transaction.create({
            identifier: secondIdentifier,
            transactionType: 'BUY',
            stockSymbol: secondStockSymbol,
            stockAmount: 100,
            shares: 2
        });
        secondCreateResult.should.not.be.null;

        // find all, verify count
        let findAllResult = await db.Transaction.findAll();
        findAllResult.should.not.be.null;
        findAllResult.length.should.equal(2);

        // find by identifier, verify
        let findByIdentifierResult = await db.Transaction.findAll({
            where : {
                identifier: firstIdentifier
            }
        });
        findByIdentifierResult.should.not.be.null;
        findByIdentifierResult.length.should.equal(1);
        findByIdentifierResult[0].stockSymbol.should.equal(firstStockSymbol);

        // find by bogus identifier, verify empty results
        let findByBogusIdentifierResult = await db.Transaction.findAll({
            where : {
                identifier: 'bogus'
            }
        });
        findByBogusIdentifierResult.should.not.be.null;
        findByBogusIdentifierResult.length.should.equal(0);

        // update a transaction by identifier
        let updateResult = await db.Transaction.update({
            stockAmount: 1000,
            shares: 10
        }, {
            where: {
                identifier: firstIdentifier
            }
        });
        let findByIdentifierAfterUpdateResult = await db.Transaction.findAll({
            where : {
                identifier: firstIdentifier
            }
        });
        findByIdentifierAfterUpdateResult.should.not.be.null;
        findByIdentifierAfterUpdateResult.length.should.equal(1);
        findByIdentifierAfterUpdateResult[0].stockSymbol.should.equal(firstStockSymbol);
        findByIdentifierAfterUpdateResult[0].stockAmount.should.equal(1000);

        // delete one transaction
        await db.Transaction.destroy({
            where : {
                identifier: firstIdentifier
            }
        });

        // find all, verify only one remains
        let findAllAfterDeleteResult = await db.Transaction.findAll();
        findAllAfterDeleteResult.should.not.be.null;
        findAllAfterDeleteResult.length.should.equal(1);
        findAllAfterDeleteResult[0].identifier.should.equal(secondIdentifier);

        // find by identifier, verify that it is indeed gone
        let findByIdentifierAfterDeleteResult = await db.Transaction.findAll({
            where : {
                identifier: firstIdentifier
            }
        });
        findByIdentifierAfterDeleteResult.should.not.be.null;
        findByIdentifierAfterDeleteResult.length.should.equal(0);
    });
});