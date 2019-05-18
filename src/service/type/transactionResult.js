/**
 * Simple data structure representing a finished transaction.
 */
class TransactionResult {

    constructor(identifier, symbol, currencyUnit, currencyAmount, shares) {
        this.identifier = identifier;
        this.symbol = symbol;
        this.currencyUnit = currencyUnit;
        this.currencyAmount = currencyAmount;
        this.shares = shares;
    }

}

module.exports = TransactionResult;