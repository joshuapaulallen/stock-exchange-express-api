'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    identifier: DataTypes.STRING,
    transactionType: DataTypes.ENUM('BUY', 'SELL'),
    stockSymbol: DataTypes.STRING,
    stockAmount: DataTypes.DOUBLE,
    shares: DataTypes.DOUBLE
  }, {
    tableName: 'stock_transaction'
  });
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};