'use strict';

exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('tasklists', (table) => {
            table.increments('id').primary();
            table.text('title').notNullable();
            table.integer('card_id').notNullable();
            table.index('card_id');
        }).then(() => {
            return knex('tasklists').insert([
                { title: 'Typowa lista zadań:', card_id: 1 },
                { title: 'Tasklist', card_id: 6 }
            ]);
        })
    ]);
};

exports.down = function (knex) {
    return knex.schema.dropTable('tasklists');
};
