'use strict';

exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('boards', (table) => {
            table.increments('id').primary();
            table.text('name').notNullable();
            table.boolean('locked').defaultTo(false);
            table.integer('user_id').notNullable();
            table.index('user_id');
        }).then(() => {
            return knex('boards').insert([
                { name: 'Board nr 1', user_id: 1 },
                { name: 'Board nr 2', user_id: 1 },
                { name: 'Board nr 3', user_id: 2 }
            ]);
        }).catch(() => {
            exports.down(knex, Promise);
        })
    ]);
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('boards');
};
