'use strict';

const SecurePassword = require('secure-password');

const pwd = SecurePassword();

exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', (table) => {
            table.increments('id').primary();
            table.varchar('name', 128).unique().notNullable();
            table.binary('password').notNullable();
        }).then(async () => {
            return knex('users').insert([
                { name: 'Mrucznik', password: await pwd.hash(Buffer.from('1234')) },
                { name: 'Rafikus', password: await pwd.hash(Buffer.from('kek')) },
                { name: 'Berendhard', password: await pwd.hash(Buffer.from('admin')) }
            ]);
        }).catch(() => {
            exports.down(knex, Promise);
        })
    ]);
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};
