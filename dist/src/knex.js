'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = require('knex')({

    client: 'mysql',
    connection: {
        host: '5.133.9.55',
        port: 3306,

        user: 'paw',
        password: 'efejoi324236tds.k',

        database: 'paw',
        charset: 'latin1'
    }
});