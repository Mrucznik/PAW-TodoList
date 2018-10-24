'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('cards', (table) => {
        table.increments('id').primary();
        table.text('name').notNullable();
        table.integer('list_id').notNullable();
        table.index('list_id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cards');
};
