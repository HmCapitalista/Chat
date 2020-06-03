
exports.up = function(knex) {
    return knex.schema.createTable('messages', table => {
        table.increments();
        
        table.string('content', 2000).notNullable();
        table.string('whoSends').notNullable();
        table.string('where').notNullable();
        table.string('date').notNullable();
        table.string('hour').notNullable();

    });

};

exports.down = function(knex) {
    return knex.schema.dropTable('messages');

};
