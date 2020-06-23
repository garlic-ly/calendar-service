const express = require('express');
const path = require('path');
const db = require('../db/index.js');

const app = express();

app.use('/api/room/:roomId', express.static(path.join(__dirname, '/../client/dist')));

// GET Route
app.get('/api/rooms/:roomId', (req, res) => {
  const { roomId } = req.params;
  const roomQuery = 'SELECT * FROM rooms WHERE id = ?';
  db.connection.query(roomQuery, [roomId], (roomError, roomResults) => {
    if (roomError) {
      res.status(404).send(roomError);
    }
    const resQuery = 'SELECT resId, startDate, endDate FROM reservations WHERE roomId = ?';
    db.connection.query(resQuery, [roomId], (resError, resResults) => {
      if (resError) {
        res.status(404).send(resError);
      }
      const results = roomResults.concat(resResults);
      res.status(200).send(results);
    });
  });
});

module.exports = app;
