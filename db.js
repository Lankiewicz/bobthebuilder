require('dotenv').config();

const mysql = require('mysql2');

const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')

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