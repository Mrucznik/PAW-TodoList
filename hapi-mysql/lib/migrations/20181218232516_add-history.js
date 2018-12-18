'use strict';

const tableName = 'history';

exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable(tableName, (table) => {
            table.increments('id').primary();
            table.text('action').notNullable();
            table.text('description');
            table.timestamp('date').defaultTo(knex.fn.now());
            table.integer('user_id').notNullable();
            table.integer('board_id').notNullable();
            table.index('user_id');
            table.index('board_id');
        }).then(() => {
            return knex(tableName).insert([
                { action: 'Some action for board 1', user_id: 1, board_id: 1 },
                { action: 'Some action for board 2', user_id: 1, board_id: 2 }
            ]);
        }).catch(() => {
            exports.down(knex, Promise);
        })
    ]);
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable(tableName);
};
