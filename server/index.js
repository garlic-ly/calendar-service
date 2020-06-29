const express = require('express');
const path = require('path');
const db = require('../db/index.js');

const app = express();

app.use('/rooms/:roomId', express.static(path.join(__dirname, '/../client/dist')));

// GET Route
app.get('/api/rooms/:roomId', (req, res) => {
  const { roomId } = req.params;
  const roomQuery = 'SELECT * FROM rooms WHERE id = ?';
  db.connection.query(roomQuery, [roomId], (roomError, roomResults) => {
    if (roomError) {
      res.status(404).send(roomError);
    } else {
      const resQuery = 'SELECT resId, startDate, endDate FROM reservations WHERE roomId = ?';
      db.connection.query(resQuery, [roomId], (resError, resResults) => {
        if (resError) {
          res.status(404).send(resError);
        } else {
          const results = roomResults.concat(resResults);
          res.status(200).send(results);
        }
      });
    }
  });
});

app.post('/api/rooms/:roomId', (req, res) => {
  const { roomId } = req.params;
  res.status(201).end();
});

module.exports = app;
