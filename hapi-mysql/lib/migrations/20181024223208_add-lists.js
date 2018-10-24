'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('lists', (table) => {
        table.increments('id').primary();
        table.text('name').notNullable();
        table.integer('board_id').notNullable();
        table.index('board_id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('lists');
};
