const sequelize = require('../db/index');
const { Sequelize } = require('sequelize');

const Transaction = sequelize.define('Transaction',{
    id : {
        type : Sequelize.UUID,
        defaultValue : Sequelize.UUIDV1,
        primaryKey : true
    },
    ticket_id : {
        type : Sequelize.UUID,
        allowNull : false
    },
    total_amt : {
        type : Sequelize.DOUBLE,
        allowNull : false
    }
}, { timestamps: false });


module.exports = Transaction;