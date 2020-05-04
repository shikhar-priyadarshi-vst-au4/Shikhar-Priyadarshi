const { Sequelize } = require('sequelize');

// let { DEV_DATABASE_NAME, 
//       DEV_USER_NAME, 
//       DEV_PASSWORD, DEV_HOST_NAME, DEV_DIALECT, PROD_DATABASE_NAME, 
//       PROD_USER_NAME, 
//       PROD_PASSWORD ,
//       PROD_HOST_NAME, 
//       PROD_DIALECT, NODE_ENV } = process.env;
      
let sequelize = new Sequelize( `postgres://atfxqjakfmrmjz:c0294adc94ab38897892783c7d0331a8ef23371aae16295a09c9d3bdfa5a5e56@ec2-34-225-82-212.compute-1.amazonaws.com:5432/dfu4nu7ufg2mt8`,{
            dialectOptions : {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
});

module.exports = sequelize;
