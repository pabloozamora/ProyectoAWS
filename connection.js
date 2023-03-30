const mysql = require('mysql');


// Coloca aquí tus credenciales
var cn = mysql.createPool({
    user: 'admin',
    host: 'dbmysql.clhkgqldebfa.us-east-2.rds.amazonaws.com',
    database: 'proyecto',
    password: 'Pewdiepie1',
    port: 3306
});

module.exports = cn

