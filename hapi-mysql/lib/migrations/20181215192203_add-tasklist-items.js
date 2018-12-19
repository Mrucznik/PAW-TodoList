'use strict';

const tableName = 'tasklist-items';

exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable(tableName, (table) => {
            table.increments('id').primary();
            table.text('name').notNullable();
            table.boolean('checked').defaultTo(false);
            table.integer('tasklist_id').notNullable();
            table.index('tasklist_id');
        }).then(() => {
            return knex(tableName).insert([
                { name: 'Zadanie A', tasklist_id: 1 },
                { name: 'Zadanie B', tasklist_id: 1 },
                { name: 'Zadanie C', tasklist_id: 2 }
            ]);
        })
    ]);
};

exports.down = function (knex) {
    return knex.schema.dropTable(tableName);
};
