/**
 * Guide: http://perkframework.com/v1/guides/database-migrations-knex.html
 */
exports.up = function(knex) {
  return knex.schema.createTable("location", table => {
    table.increments("id").primary();
    table.string("title", 255);
    table.decimal(
      "lat",
      10,
      8
    ); /* https://stackoverflow.com/questions/12504208/what-mysql-data-type-should-be-used-for-latitude-longitude-with-8-decimal-places */
    table.decimal("lng", 11, 8);
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("location");
};
