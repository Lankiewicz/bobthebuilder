const express = require('express');
const app = express();
const db = require('./db');
const signup = require('./signup');

app.use(express.json());

app.use('/', signup);

// Konfiguracja i uruchomienie serwera
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

exports.app = app;
