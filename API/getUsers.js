const express = require('express');
const router = express.Router();
const connection = require('../models/db');

// Endpoint API GET do pobierania użytkowników
router.get('/users', (req, res) => {
  connection.query(`SELECT * FROM Users`,
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Błąd serwera' });
      }
      res.json(results);
    });  
});

module.exports = router;
