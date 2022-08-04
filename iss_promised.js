const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyoverTimes = function(body) {
  const coordinates = {};
  coordinates.latitude = JSON.parse(body).latitude;
  coordinates.longitude = JSON.parse(body).longitude;
  return request(`https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`);
};

const printFlyoverTimes = function(body) {

  let flyoverTimes = JSON.parse(body).response;

  for (let time of flyoverTimes) {
    let dateTime = new Date(0);
    dateTime.setUTCSeconds(time.risetime);

    console.log(`Next pass at ${dateTime.toString()} for ${time.duration} seconds!`);
  }
  return;
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyoverTimes,
  printFlyoverTimes
};