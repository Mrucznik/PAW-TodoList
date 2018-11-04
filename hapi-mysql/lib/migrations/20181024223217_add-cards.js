'use strict';

exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('cards', (table) => {
            table.increments('id').primary();
            table.text('name').notNullable();
            table.integer('list_id').notNullable();
            table.index('list_id');
        }).then(() => {
            return knex('cards').insert([
                { name: 'Wskrzesić Akwarelistę', list_id: 1 },
                { name: 'Namalować obraz', list_id: 1 },
                { name: 'Obronić wschodnią flankę', list_id: 1 },
                { name: 'Zaprogramować niezaprogroamowane', list_id: 2 },
                { name: 'Zaliczyć projekt', list_id: 2 },
                { name: 'Napić się piwa', list_id: 3 },
                { name: 'Iść spać', list_id: 3 },
                { name: 'Testowa karta', list_id: 4 },
                { name: 'Usunąć to', list_id: 5 }
            ]);
        })
    ]);
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('cards');
};
