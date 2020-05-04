const sequelize = require('../db/index');
const { Sequelize } = require('sequelize');

const Ticket = sequelize.define('Ticket',{
    id : {
        type : Sequelize.UUID,
        defaultValue : Sequelize.UUIDV1,
        primaryKey : true
    },
    profile_id: {
        type : Sequelize.UUID,
        allowNull : false
    },
    customer_id :{
        type : Sequelize.UUID,
        allowNull : false
    },
    booking_id :{
        type : Sequelize.UUID,
        allowNull : false
    },
    services: {
        type : Sequelize.ARRAY(Sequelize.STRING),
        allowNull : false
        },
    action : {
        type : Sequelize.ENUM,
        values: ['Pending', 'Accept', 'Completed']
    }
});


module.exports = Ticket;