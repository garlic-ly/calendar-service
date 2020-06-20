const express = require('express');
const app = express();
var db = require('../db/index.js');
const port = 3001;


app.use(express.static(__dirname + '/../client/dist'));

// GET Route
app.get('/api/rooms/:roomId', (req, res) => {
  var roomId = req.params.roomId;
  var roomQuery = 'SELECT * FROM rooms WHERE id = ?';
  db.connection.query(roomQuery, [roomId], (error, roomResults, fields) => {
    if (error) {
      res.status(404).send(error);
    }
    var resQuery = 'SELECT resId, startDate, endDate FROM reservations WHERE roomId = ?'
    db.connection.query(resQuery, [roomId], (error, resResults, fields) => {
      if (error) {
        res.status(404).send(error);
      }
      var results = roomResults.concat(resResults);
      res.status(200).send(results);
    });
  });
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});