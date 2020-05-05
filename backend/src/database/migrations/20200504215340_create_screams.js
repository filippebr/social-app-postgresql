
exports.up = function(knex) {
  return knex.schema.createTable('screams', table => {
    table.increments();
    
    table.string('user_handle').unique().notNullable();
    table.string('body').notNullable();

    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return table.schema.dropTable('screams');
};
