'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/lists',
        options: {
            tags: ['api'],
            handler: {
                tandy: {}
            }
        }
    },
    {
        method: 'GET',
        path: '/lists/{id}',
        options: {
            tags: ['api'],
            handler: {
                tandy: {}
            }
        }
    },
    {
        method: 'GET',
        path: '/lists/{id}/cards',
        options: {
            tags: ['api'],
            handler: {
                tandy: {}
            }
        }
    }
];
