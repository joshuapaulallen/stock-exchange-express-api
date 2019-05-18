/**
 * Simple data structure representing a requested transaction.
 */
class TransactionRequest {

    constructor(symbol, transactionType, currencyUnit, currencyAmount) {
        this.symbol = symbol;
        this.transactionType = transactionType;
        this.currencyUnit = currencyUnit;
        this.currencyAmount = currencyAmount;
    }

}

module.exports = TransactionRequest;