const express = require('express');
const app = express();
const db = require('../models/db');
const signup = require('../API/signUp');
const getAuthRouter = require('../API/login');
const getUsersRouter = require('../API/getUsers');


app.use(getAuthRouter);
app.use('/signup', signup);
app.use('/', signup);
app.use(getUsersRouter);

app.use(express.json());

// Konfiguracja i uruchomienie serwera
const port = process.env.PORT || 3019;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

exports.app = app;