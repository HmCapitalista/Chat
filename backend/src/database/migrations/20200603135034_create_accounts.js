
exports.up = function(knex) {
    return knex.schema.createTable('accounts', table => {
        table.string('id').primary();

        table.string('name').notNullable();
        table.string('password').notNullable();
        table.boolean('online').notNullable();

    });

};

exports.down = function(knex) {
    return knex.schema.dropTable('accounts');

};
