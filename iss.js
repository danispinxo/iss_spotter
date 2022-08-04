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
        console.log(error);
        return;
      }

      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        console.log(msg, response.statusCode);
        return;
      }
      const ipCoordObject = JSON.parse(body);
      const coordinates = {};
      coordinates.latitude = ipCoordObject.latitude;
      coordinates.longitude = ipCoordObject.longitude;
      if (ipCoordObject.latitude === undefined) {
        console.log("Error: Improper IP address submitted.");
        return;
      }
      console.log(coordinates);

    });

};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};