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

// Endpoint API POST do dodawania użytkowników
app.post('/signup', (req, res) => {
    const {email, password } = req.body;
    const saltRounds = 10;

    if(!validateEmail(email)) {
        res.status(400).send('Błędny adres email');
        return;
    }
    if(!validatePassword(password)) {
        res.status(400).send('Błędne hasło');
        return;
    }

    // Hashowanie hasła za pomocą biblioteki bcrypt.js
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
            res.status(500).send('Błąd hashowania hasła');
            return;
        }

        connection.query(
            `INSERT INTO Users (name, email, password) VALUES (?, ?, ?)`,
            [' ', req.body.email, hash],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error adding user');            
                    return;
                }
                console.log('User added');
                const user = { email };
                const token = jwt.sign(user, secretKey);
                req.session.token = token;
                res.status(201).json({ token });
                return;
            }
        );
    });
});

//Endpoint zabezpieczony tokenem
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected endpoint' });
});

module.exports = app;
 