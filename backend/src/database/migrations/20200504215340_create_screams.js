
exports.up = function(knex) {
  return knex.schema.createTable('screams', table => {
    table.string('id').primary();
    
    table.string('user_handle').unique().notNullable();
    table.string('body').notNullable();

    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('screams');
};
