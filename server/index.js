const express = require('express');
const app = express();
var db = require('../db/index.js');
const port = 3001;


// app.use(express.static(__dirname + '../client/dist'));

// GET Route
app.get('api/rooms/:roomId', (req, res) => {
  console.log('In GET Route');
  var roomId = req.params.roomId;
  console.log(roomId);
  var sqlQuery = 'SELECT * FROM rooms, reservations WHERE rooms.id = ? AND reservations.roomId = ?';
  db.connection.query(sqlQuery, [roomId, roomId], (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(404).send(error);
    }
    console.log(results);
    res.status(200).send(results);
  });
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});