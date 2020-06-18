var roomData = [];
var reservedData = [];

var createSeedData = function() {
  for (let i = 0; i < 100; i++) {
    var room = {
      totalRatings: Math.floor(Math.random() * (1000 - 0)),
      averageRating: Math.floor(Math.random() * (5 - 0)),
      nightlyRate: Math.floor(Math.random() * (1,200 - 0)) + 100,
      cleaningFee: Math.floor(Math.random() * (250 - 0)) + 25,
    };
    for (let j = 0; j < 6; j++) {
      if (j === 0) {
        var startDate = fake.data_between('today', '+6 months');
        var reservation = {
          startDate: startDate,
          endDate: fake.data_between(startDate, '+1 month'),
          roomId: i + 1
        };
      } else {
        var startDate = fake.data_between('today', '+6 months');
        var reservation = {
          startDate: startDate,
          endDate: fake.data_between(startDate, '+1 month'),
          roomId: i + 1
        };
        reservedData.push(reservation);
      }
    }
    roomData.push(room);
  }
}

createSeedData();