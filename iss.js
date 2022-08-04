const request = require("request");

const fetchMyIP = function(callback) {
  request(
    `https://api.ipify.org/?format=json`,
    (error, response, body) => {

      if (error) {
        callback(error, null);
        return;
      }

      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }

      const ipObject = JSON.parse(body);
      const ipData = ipObject.ip;
      callback(null, ipData);

    });
};

const fetchCoordsByIP = (ip, callback) => {

  request(
    `http://ipwho.is/${ip}`,
    (error, response, body) => {

      if (error) {
        callback(error, null);
        return;
      }

      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      const ipCoordObject = JSON.parse(body);
      const coordinates = {};
      coordinates.latitude = ipCoordObject.latitude;
      coordinates.longitude = ipCoordObject.longitude;
      if (ipCoordObject.latitude === undefined) {
        const msg = "Error: Improper IP address submitted.";
        callback(Error(msg), null);
        return;
      }

      callback(null, coordinates);
      

    });

};

const fetchISSFlyoverTimes = (coords, callback) => {

  request(
    `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        console.log(error);
      }

      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        console.log(msg, response.statusCode);
        return;
      }

      const flyoverObject = JSON.parse(body);
      const flyoverTimes = flyoverObject.response;

      callback(null, flyoverTimes);
    });
};

const nextISSTimesForMyLocation = () => {

  fetchMyIP((error, ipData) => {
    if (error) {
      console.log("It didn't work!:", error);
      return;
    }
    fetchCoordsByIP(ipData, (error, coordinates) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }
      fetchISSFlyoverTimes(coordinates, (error, flyoverTimes) => {
        if (error) {
          console.log("It didn't work!", error);
          return;
        }

        for (let time of flyoverTimes) {
          let dateTime = new Date(0);
          dateTime.setUTCSeconds(time.risetime);

          console.log(`Next pass at ${dateTime.toString()} for ${time.duration} seconds!`);
        }
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation,
};