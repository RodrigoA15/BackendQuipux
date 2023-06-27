const database = require('../env.js');
const {Sequelize} = require("sequelize");
const oracle = require('oracledb')

const  sequelize = new Sequelize(
    
    database.service_name,
    database.user,
    database.password,
   
    {
        host: database.hostname,
        port: database.port,
        dialect: 'oracle',
    }
);

sequelize.sync({force: false}).then(() => {
    console.log(`Conecction succesfully database: ${database.service_name}`);
}).catch((err) => {
    console.log(`Error connect to database ${err}`);
})

module.exports = sequelize;