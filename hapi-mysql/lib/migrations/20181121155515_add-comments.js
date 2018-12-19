'use strict';

const tableName = 'comments';

exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable(tableName, (table) => {
            table.increments('id').primary();
            table.text('message').notNullable();
            table.timestamp('date').defaultTo(knex.fn.now());
            table.integer('user_id').notNullable();
            table.integer('card_id').notNullable();
            table.index('user_id');
            table.index('card_id');
        }).then(() => {
            return knex(tableName).insert([
                { message: 'Jestem oburzony, jak można coś takiego zrobić.', user_id: 1, card_id: 1 },
                { message: 'Testowy komentarz.', user_id: 2, card_id: 6 }
            ]);
        })
    ]);
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable(tableName);
};
