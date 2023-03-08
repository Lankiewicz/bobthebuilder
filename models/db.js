require('dotenv').config({path: '../.env'});
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'eu-central.connect.psdb.cloud',
    user: 'p5njy22wgb3kx1x5inbs',
    password: 'pscale_pw_EOPt2klmUnAlLXbypa7T6zv7wU1F8Lz3jsyuHMkq1RN',
    database: 'bobmanager',
    ssl: {
        rejectUnauthorized: true
    }
});


connection.query("Show tables like 'USERS'", function(err, results) {
    if (err) {
        console.log(err);
        connection.end();
        return;
    }

    if (results.length === 0) {
connection.query(
    `CREATE TABLE Users (
        id INT (11) NOT NULL AUTO_INCREMENT,
        name VARCHAR (255) NOT NULL,
        email VARCHAR (255) NOT NULL,
        password VARCHAR (255) NOT NULL,
        PRIMARY KEY (id)
        )`, 
    function(err, results) {
        });
    } else {
        console.log('Table Users created');    
    }
});


module.exports = connection; 