DROP DATABASE airbnb;

CREATE DATABASE airbnb;

USE airbnb;

CREATE TABLE rooms (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  totalRatings INTEGER,
  averageRatings INTEGER,
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