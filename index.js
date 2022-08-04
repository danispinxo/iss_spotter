const { fetchMyIP } = require("./iss");

fetchMyIP((error, ipData) => {
  if (error) {
    console.log("It didn't work!:", error);
  } else {
    console.log("It worked! Returned IP:", ipData);
  }
});
