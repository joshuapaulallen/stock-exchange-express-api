import express from 'express';
import stockTransactionService from 'service/stockTransactionService';
import TransactionRequest from 'service/type/transactionRequest';

var router = express.Router();

/**
 * Find all transactions.
 */
router.get('/', async (req, res, next) => {
    let allTransactions = await stockTransactionService.findAll();
    res.json(allTransactions);
});

/**
 * Request a transaction
 */
router.post('/', async (req, res, next) => {
    let buyResult = await stockTransactionService.buy(new TransactionRequest(req.body.symbol, 'BUY', req.body.currencyUnit, req.body.amount));
    res.json(buyResult);
});

/**
 * Find transaction for identifier.
 */
router.get('/id/:identifier', async (req, res, next) => {
    let transaction = await stockTransactionService.findByIdentifier(req.params.identifier);
    if (transaction) {
        res.json(transaction);
    } else {
        res.status(404).send('Not found');
    }
});

/**
 * Find transactions for stock symbol.
 */
router.get('/symbol/:symbol', async (req, res, next) => {
    let transactionsWithSymbol = await stockTransactionService.findBySymbol(req.params.symbol);
    res.json(transactionsWithSymbol);
});

module.exports = router;