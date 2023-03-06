const express = require('express');
const app = express();
const db = require('../models/db');
const signup = require('../API/signUp');

app.use(express.json());

app.use('/', signup);

// Konfiguracja i uruchomienie serwera
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

exports.app = app;
