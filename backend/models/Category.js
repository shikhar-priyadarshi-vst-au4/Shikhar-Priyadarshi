const sequelize = require('../db/index');
const {Sequelize} = require('sequelize');

const Category = sequelize.define('Category',{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true 
    },
    category : {
      type : Sequelize.STRING,
      allowNull : false,
    },
   services : {
      type : Sequelize.ARRAY(Sequelize.JSON),
      allowNull : false
  }
})

module.exports = Category;