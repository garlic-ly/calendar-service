DROP DATABASE IF EXISTS garliclyCalendar;

CREATE DATABASE garliclyCalendar;

USE garliclyCalendar;

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