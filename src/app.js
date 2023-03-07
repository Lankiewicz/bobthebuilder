const express = require('express');
const app = express();
const db = require('../models/db');
const signup = require('../API/signUp');
const login = require('../API/login');


app.use('/login', login);
app.use('/signup', signup);
app.use('/', signup);

app.use(express.json());

// Konfiguracja i uruchomienie serwera
const port = process.env.PORT || 3007;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

exports.app = app;
