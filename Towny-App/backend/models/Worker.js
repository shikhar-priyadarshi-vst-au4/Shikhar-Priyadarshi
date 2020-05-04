
const sequelize = require('../db/index');
const { Sequelize } = require('sequelize');

const Worker = sequelize.define('Worker',{
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true 
    }, 
    image : {
        type : Sequelize.STRING,
        allowNull : true
    },
    name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    },
    mobileNumber : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    specialisation : {
        type : Sequelize.STRING,
        allowNull : false
    },
    area : {
        type : Sequelize.STRING,
        allowNull : false
    }
}, { timestamps: false });


module.exports = Worker;