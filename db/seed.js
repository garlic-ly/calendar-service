var db = require('./index.js');
var faker = require('faker');

var roomData = [];
var reservedData = [];

var createSeedData = function(callback) {
  for (let i = 0; i < 100; i++) {
    var room = {
      id: i + 1,
      totalRatings: Math.floor(Math.random() * (1000 - 0)),
      averageRating: Math.floor(Math.random() * (5 - 0)) + 1,
      nightlyRate: Math.floor(Math.random() * (1,200 - 0)) + 100,
      cleaningFee: Math.floor(Math.random() * (250 - 0)) + 25,
    };
    for (let j = 0; j < 6; j++) {
      var reservation = {
        startDate: faker.date.between(`2020-${7 + j}-01`, `2020-${7 + j}-15`),
        endDate: faker.date.between(`2020-${7 + j}-16`, `2020-${7 + j}-28`),
        roomId: i + 1
      }
      reservedData.push(reservation);
    }
    roomData.push(room);
  }
  callback(roomData, reservedData);
}

var loadData = function(roomsArray, reservationsArray) {
  for (let i = 0; i < roomsArray.length; i++) {
    var room = roomsArray[i];
    db.connection.query('INSERT INTO rooms (id, totalRatings, averageRating, nightlyRate, cleaningFee) VALUES(?, ?, ?, ?, ?)', [room.id, room.totalRatings, room.averageRating, room.nightlyRate, room.cleaningFee], function(error, results, fields) {
      if (error) console.log('Error: ', error);
      for (let j = 0; j < 6; j++) {
        var reservation = reservationsArray[j];
        db.connection.query('INSERT INTO reservations (startDate, endDate, roomId) VALUES(?, ?, ?)', [reservation.startDate, reservation.endDate, reservation.roomId], function(error, results, fields) {
          if (error) console.log('Error: ', error);
        });
      }
      reservationsArray = reservationsArray.slice(6);
    });
  }
  console.log('All Data Loaded');
}

createSeedData(() => {
  loadData(roomData, reservedData);
});