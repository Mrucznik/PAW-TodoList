'use strict';

const tableName = 'lists';

exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable(tableName, (table) => {
            table.increments('id').primary();
            table.text('name').notNullable();
            table.integer('board_id').notNullable();
            table.index('board_id');
        }).then(() => {
            return knex(tableName).insert([
                { name: 'Testowa lista nr 1 dla 1 boarda', board_id: 1 },
                { name: 'Testowa lista nr 2 dla 1 boarda', board_id: 1 },
                { name: 'Testowa lista nr 1 dla 2 boarda', board_id: 2 },
                { name: 'Testowa lista nr 2 dla 2 boarda', board_id: 2 },
                { name: 'Testowa lista dla 3 boarda', board_id: 3 }
            ]);
        })
    ]);
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable(tableName);
};
