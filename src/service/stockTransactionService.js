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
     * Find all transactions.
     *
     * @returns {Promise<TransactionResult[]>}
     */
    let findAll = async () => {
        let allTransactions = await db.Transaction.findAll();

        return allTransactions.map(toTransactionResult);
    };

    /**
     * Find the transaction with the given identifier.
     *
     * @param identifier {string} The identifier.
     * @returns {Promise<TransactionResult>}
     */
    let findByIdentifier = async (identifier) => {
        let findByIdentifierResult = await db.Transaction.findAll({
            where : {
                identifier: identifier
            }
        });

        return findByIdentifierResult.length > 0 ? toTransactionResult(findByIdentifierResult[0]) : null;
    };

    /**
     * Find the transactions with the given stock symbol.
     *
     * @param symbol {string} The stock symbol.
     * @returns {Promise<TransactionResult[]>}
     */
    let findBySymbol = async (symbol) => {
        let transactionsBySymbolResult = await db.Transaction.findAll({
            where : {
                stockSymbol: symbol
            }
        });

        return transactionsBySymbolResult.map(toTransactionResult);
    };

    /**
     * Generate a new unique identifier for a transaction.
     */
    let generateTransactionIdentifier = () => {
        return uuidv4();
    };

    let toTransactionResult = (transactionEntity) => {
        return new TransactionResult(transactionEntity.identifier, transactionEntity.stockSymbol, 'USD', transactionEntity.stockAmount, transactionEntity.shares);
    };

    return {
        buy : buy,
        findAll : findAll,
        findByIdentifier : findByIdentifier,
        findBySymbol : findBySymbol
    };
};

module.exports = stockTransactionService();