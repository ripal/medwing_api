var express = require("express");
var router = express.Router();
let GeoCoder = require("../models/Geocoder");

/**
 * @swagger
 * /geocode:
 *  get:
 *    tags:
 *      - geocode
 *    name: Get latititude and longitue
 *    summary: Get latitutde and longitude from google service based on given address
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: address
 *        required: true
 *    responses:
 *      '200':
 *        description: Got latitude and longitude successfully for given address
 *      '400':
 *        description: Invalid Request. Check required params.
 *      '500':
 *        description: Server Error
 */
router.get("/", function(req, res, next) {
  const address = req.query.address;

  if (address && address.trim() !== "")
    GeoCoder.getLatLongFromAddress(address).then(result => {
      req.result = result;
      next();
    });
  else {
    req.result = { code: 400 };
    next();
  }
});

module.exports = router;
