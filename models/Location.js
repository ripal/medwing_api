let Location = require("../database/Location_Table");

/**
 * Get saved location list
 */
let getLocation = () => {
  return Location.fetchAll().then(locations => {
    if (locations) {
      return { data: locations };
    } else {
      return { code: 500 };
    }
  });
};
exports.getLocations = () => {
  return getLocation();
};

/**
 * Add new location
 * @param object {title, lat, lng}
 */
exports.addLocation = location => {
  return Location.forge(location)
    .save()
    .then(result => {
      if (result) {
        return getLocation();
      } else {
        return { code: 500 };
      }
    });
};

/**
 * Update existing location
 * @param number location id to update
 * @param object {title, lat, lng}
 */
exports.updateLocation = (id, location) => {
  return Location.where("id", id)
    .fetch()
    .then(query => {
      return query.save(location).then(result => {
        if (result) {
          return getLocation();
        } else {
          return { code: 500 };
        }
      });
    });
};

/**
 * Delete existing location
 * @param number location id to delete
 */
exports.deleteLocation = locationId => {
  return Location.where("id", locationId)
    .destroy()
    .then(result => {
      if (result) {
        return getLocation();
      } else {
        return { code: 500 };
      }
    });
};
