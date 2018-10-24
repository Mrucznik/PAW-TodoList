'use strict';

exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('boards', (table) => {
            table.increments('id').primary();
            table.text('name').notNullable();
        }).then(() => {
            return knex('boards').insert([
                { name: 'Board nr 1' },
                { name: 'Board nr 2' },
                { name: 'Board nr 3' }
            ]);
        })
    ]);
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('boards');
};
