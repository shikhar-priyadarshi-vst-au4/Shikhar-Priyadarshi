const sequelize = require('../db/index');
const Sequelize = require('sequelize');

const Available = sequelize.define('Available', {
    id : {
        type : Sequelize.UUID,
        defaultValue : Sequelize.UUIDV1,
        primaryKey : true
    },
    domain : {
        type : Sequelize.TEXT,
        allowNull : false
    },
    worker_id : {
        type : Sequelize.UUID,
        allowNull : false,
    },
    status : {
        type : Sequelize.ENUM(['BUSY','FREE']),
        allowNull : false
    }
})
module.exports = Available;