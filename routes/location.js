var express = require("express");
var router = express.Router();
let location = require("../models/Location");

/**
 * @swagger
 * /location:
 *  get:
 *    tags:
 *      - location
 *    name: Get saved locations
 *    summary: Get my saved locations(markers) on google map
 *    consumes:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Saved location list
 *      '500':
 *        description: Server Error
 */
router.get("/", function(req, res, next) {
  location.getLocations().then(locations => {
    req.result = locations;
    next();
  });
});

/**
 * @swagger
 * /location:
 *  post:
 *    tags:
 *      - location
 *    name: Add / Update location
 *    summary: Add new location on map or update existing location on map
 *    parameters:
 *      - in: body
 *        name: body
 *        description: pass id along with other data when need to update existing location
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *              required: true
 *            lat:
 *              type: number
 *              required: true
 *            lng:
 *              type: number
 *              required: true
 *    consumes:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Saved/Updated successfully
 *      '400':
 *        description: Invalid Request. Check required params.
 *      '500':
 *        description: Server Error
 */
router.post("/", function(req, res, next) {
  const title = req.body.title;
  const lat = req.body.lat;
  const lng = req.body.lng;
  const id = req.body.id;
  let result;

  if (!lat && !lng && !title) {
    req.result = { code: 400 };
    next();
  } else {
    if (id) {
      result = location.updateLocation(id, { title, lat, lng });
    } else {
      result = location.addLocation({ title, lat, lng });
    }
    result.then(locations => {
      req.result = locations;
      next();
    });
  }
});

/**
 * @swagger
 * /location/{id}:
 *  delete:
 *    tags:
 *      - location
 *    name: Delete location
 *    summary: Delete existing location from map
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: number
 *    consumes:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Deleted Successfully
 *      '400':
 *        description: Invalid Request. Check required params.
 *      '500':
 *        description: Server Error
 */
router.delete("/:id", function(req, res, next) {
  const locationId = req.params.id;

  if (!locationId || isNaN(locationId)) {
    req.result = { code: 400 };
    next();
  } else {
    location.deleteLocation(locationId).then(locations => {
      req.result = locations;
      next();
    });
  }
});
module.exports = router;
