'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/cards',
        options: {
            tags: ['api'],
            handler: {
                tandy: {}
            }
        }
    },
    {
        method: 'GET',
        path: '/cards/{id}',
        options: {
            tags: ['api'],
            handler: {
                tandy: {}
            }
        }
    }
];
