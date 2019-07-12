let connection = require("../database/DbConnection");
let { TABLE_LOCATION } = require("../database/Tables");

const location = connection.Model.extend({
  tableName: TABLE_LOCATION,
  hasTimestamps: true
});
module.exports = location;
