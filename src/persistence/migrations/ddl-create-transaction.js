'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('stock_transaction', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      identifier: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      transactionType: {
        allowNull: false,
        type: Sequelize.ENUM('BUY', 'SELL')
      },
      stockSymbol: {
        allowNull: false,
        type: Sequelize.STRING
      },
      stockAmount: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      shares: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('stock_transaction');
  }
};