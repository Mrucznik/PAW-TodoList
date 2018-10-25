'use strict';

const Tandy = require('tandy');

module.exports = {
    name: 'tandy',
    async register(server) {
        await server.register(
            {
                plugin: Tandy,
                options: {
                    info: {
                        prefix: ''
                    }
                }
            }
        );
    }
};
