exports.up = function (knex) {
    return knex.schema.createTable('wow', tbl => {
      tbl.increments()
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('wow');
  };