const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const connection = require('../models/db');

const session = require('express-session');

//Konfiguracja sesji
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
}));

app.use(cors());
app.use(express.json());

const jwt = require('jsonwebtoken');
const secretKey = 'mysecretkey';

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

// Walidacja adresu email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!emailRegex.test(email)) {
    res.status(400).send('Błędny adres email');
    return;
}
return true;
}

// Walidacja hasła
function validatePassword(password) {
    if(!password) {
     res.status(400).send('Błędne hasło');
            return false;
     }
     if(password.length < 8) {
          res.status(400).send('Błędne hasło');
          return false;
     }
     return true;
    }

// Endpoint POST do logowania
app.post('/login', (req, res) => {
    const {email, password} = req.body;
    
    if(!email || !password) {
        res.status(400).json({error: 'Błędny adres email lub hasło'});
        return;
    }

    connection.query(`SELECT * FROM Users WHERE email = ?`, 
    [email], 
    (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).json({error: 'image.png'});
            return;
        }

        if(results.length === 0) {
            res.status(401).json({error: 'Błędny adres email lub hasło'});
            return;
        }

        const user = results[0];

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({error: 'Wewnętrzny błąd serwera'});
                    return;
                }
                if(!isMatch) {
                    res.status(401).json({error: 'Błędny adres email lub hasło'});
                    return;
                }

                res.status(200).json({message: 'Zalogowano pomyślnie'});
            });
        });
    });

module.exports = app;

