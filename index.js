const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyoverTimes } = require("./iss");

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

      console.log(flyoverTimes);

    });
    
  });

});

