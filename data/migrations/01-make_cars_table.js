
exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments()
    tbl.string('vin', 256).unique().notNullable()
    tbl.string('make', 256).notNullable()
    tbl.string('model', 256).notNullable()
    tbl.integer('mileage').notNullable()
    tbl.string('title', 256)
    tbl.string('transmission', 256)
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars');
};
