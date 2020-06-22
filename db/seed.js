const faker = require('faker');
const db = require('./index.js');

const createSeedData = (callback) => {
  const roomData = [];
  const reservedData = [];
  for (let i = 0; i < 100; i += 1) {
    const room = {
      id: i + 1,
      totalRatings: Math.floor(Math.random() * (1000 - 0)),
      averageRating: Math.floor(Math.random() * (5 - 0)) + 1,
      nightlyRate: Math.floor(Math.random() * (1200 - 0)) + 100,
      cleaningFee: Math.floor(Math.random() * (250 - 0)) + 25,
    };
    for (let j = 0; j < 6; j += 1) {
      const reservation = {
        startDate: faker.date.between(`2020-${7 + j}-01`, `2020-${7 + j}-15`),
        endDate: faker.date.between(`2020-${7 + j}-16`, `2020-${7 + j}-28`),
        roomId: i + 1,
      };
      reservedData.push(reservation);
    }
    roomData.push(room);
  }
  callback(roomData, reservedData);
};

const loadData = (roomsArray, reservationsArray) => {
  let currentReservations = reservationsArray.slice();
  for (let i = 0; i < roomsArray.length; i += 1) {
    const room = roomsArray[i];
    db.connection.query('INSERT INTO rooms (id, totalRatings, averageRating, nightlyRate, cleaningFee) VALUES(?, ?, ?, ?, ?)', [room.id, room.totalRatings, room.averageRating, room.nightlyRate, room.cleaningFee], (roomError) => {
      if (roomError) console.log('Error: ', roomError);
      for (let j = 0; j < 6; j += 1) {
        const reservation = currentReservations[j];
        db.connection.query('INSERT INTO reservations (startDate, endDate, roomId) VALUES(?, ?, ?)', [reservation.startDate, reservation.endDate, reservation.roomId], (resError) => {
          if (resError) console.log('Error: ', resError);
        });
      }
      currentReservations = currentReservations.slice(6);
    });
  }
  console.log('All Data Loaded');
};

createSeedData((roomData, reservedData) => {
  loadData(roomData, reservedData);
});
