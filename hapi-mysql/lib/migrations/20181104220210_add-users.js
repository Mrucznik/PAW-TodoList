'use strict';

const tableName = 'users';

const SecurePassword = require('secure-password');

const pwd = SecurePassword();

exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable(tableName, (table) => {
            table.increments('id').primary();
            table.varchar('name', 128).unique().notNullable();
            table.binary('password').notNullable();
        }).then(async () => {
            return knex(tableName).insert([
                { name: 'Mrucznik', password: await pwd.hash(Buffer.from('1234')) },
                { name: 'Rafikus', password: await pwd.hash(Buffer.from('kek')) },
                { name: 'Berendhard', password: await pwd.hash(Buffer.from('admin')) }
            ]);
        })
    ]);
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable(tableName);
};
