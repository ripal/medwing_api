let Geocoder = require("node-geocoder");

let options = {
  provider: "google",

  // Optional depending on the providers
  httpAdapter: "https", // Default
  apiKey: process.env.MAP_API, // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

/**
 * Get lat and long from given address
 */
exports.getLatLongFromAddress = function(address) {
  let geocoder = Geocoder(options);
  return geocoder
    .geocode(address)
    .then(function(res) {
      return { data: res };
    })
    .catch(function(err) {
      console.log(err);
      return { code: 500 };
    });
};
