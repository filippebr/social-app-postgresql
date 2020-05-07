
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.string('id').primary();
    
    table.string('email').unique().notNullable();
    table.string('user_handle').notNullable();

    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};