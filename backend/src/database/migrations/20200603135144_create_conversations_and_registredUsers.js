
exports.up = function(knex) {
    return knex.schema.createTable('conversation', table => {
        table.string('id').primary();

        table.string('name').notNullable();

    }).createTable('registredUsers', table => {
        
        table.string('userID').notNullable();
        table.string('conversationID').notNullable();

    });

};

exports.down = function(knex) {
    return knex.schema.dropTable('conversation').dropTable('registredUsers');

};
