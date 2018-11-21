'use strict';

exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('cards', (table) => {
            table.increments('id').primary();
            table.text('name').notNullable();
            table.text('description');
            table.integer('position').notNullable();
            table.integer('list_id').notNullable();
            table.index('list_id');
        }).then(() => {
            return knex('cards').insert([
                { name: 'Wskrzesić Akwarelistę', description: 'Dla jednych kontrowersyjne, dla drugich oczywiste.', position: 1, list_id: 1 },
                { name: 'Namalować obraz', description: 'Akwarelami', position: 2, list_id: 1 },
                { name: 'Obronić wschodnią flankę', description: 'Czołgami', position: 3, list_id: 1 },
                { name: 'Zaprogramować niezaprogroamowane', description: 'Naprawić zaprogramowane', position: 1, list_id: 2 },
                { name: 'Zaliczyć projekt', description: 'I nie tylko', position: 2, list_id: 2 },
                { name: 'Napić się piwa', description: 'I wódki', position: 1, list_id: 3 },
                { name: 'Iść spać', description: 'bez chrapania', position: 2, list_id: 3 },
                { name: 'Testowa karta', description: 'testowy opis', position: 1, list_id: 4 },
                { name: 'Usunąć to', description: 'i to też', position: 1, list_id: 5 }
            ]);
        })
    ]);
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('cards');
};
