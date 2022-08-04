const { fetchMyIP, fetchCoordsByIP } = require("./iss");

fetchMyIP((error, ipData) => {
  if (error) {
    console.log("It didn't work!:", error);
    return;
  }

  fetchCoordsByIP(ipData, (error, coordinates) => {
  
    if (error) {
      console.log("It didn't work!", error);
    }
    console.log(coordinates);
  });

});

