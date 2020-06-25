DROP DATABASE garlicly;

CREATE DATABASE garlicly;

USE garlicly;

CREATE TABLE rooms (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  totalRatings INTEGER,
  averageRating INTEGER,
  nightlyRate INTEGER,
  cleaningFee INTEGER
);

CREATE TABLE reservations (
  resId INTEGER AUTO_INCREMENT PRIMARY KEY,
  startDate date,
  endDate date,
  roomId INTEGER,
  FOREIGN KEY(roomId) REFERENCES rooms(id)
);