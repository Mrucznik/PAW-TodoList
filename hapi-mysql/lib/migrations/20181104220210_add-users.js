'use strict';

exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', (table) => {
            table.increments('id').primary();
            table.varchar('name', 128).unique().notNullable();
            table.binary('password').notNullable();
        }).then(() => {
            return knex('users').insert([
                { name: 'Mrucznik', password: '1234' },
                { name: 'Rafikus', password: '4321' },
                { name: 'Berendhard', password: '1212' }
            ]);
        })
    ]);
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};
