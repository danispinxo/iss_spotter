const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyoverTimes,
  printFlyoverTimes
} = require('./iss_promised');

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyoverTimes)
  .then(printFlyoverTimes)
  .catch((error) => {
    console.log("It didn't work:", error.message);
  });