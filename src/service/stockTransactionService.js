import uuidv4 from "uuid/v4";

import db from 'persistence/model';
import stockInfoService from "service/stockInfoService";
import TransactionResult from "service/type/transactionResult";

/**
 * Service for placing and fetching stock transactions.
 */
const stockTransactionService = () => {

    /**
     * Request the purchase of a stock.
     *
     * @param transactionRequest {TransactionRequest}
     * @returns {Promise<TransactionResult>}
     */
    let buy = async (transactionRequest) => {
        // fetch market price and calculate the shares
        let stockPrice = await stockInfoService.getMarketPrice(transactionRequest.symbol);
        let shares = transactionRequest.currencyAmount / stockPrice;

        // prepare a transaction to save
        let transaction = {
            identifier:  generateTransactionIdentifier(),
            transactionType: 'BUY',
            stockSymbol: transactionRequest.symbol,
            stockAmount: transactionRequest.currencyAmount,
            shares: shares
        };

        // save it
        let transactionResult = await db.Transaction.create(transaction);

        // wrap in a TransactionResult and return it
        return new TransactionResult(transactionResult.identifier, transactionResult.stockSymbol, 'USD', transactionResult.stockAmount, transactionResult.shares);
    };

    /**
     * Generate a new unique identifier for a transaction.
     */
    let generateTransactionIdentifier = () => {
        return uuidv4();
    };

    return {
        buy : buy
    };
};

module.exports = stockTransactionService();