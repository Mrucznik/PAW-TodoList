'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('boards', (table) => {
        table.increments('id').primary();
        table.text('name').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('boards');
};
