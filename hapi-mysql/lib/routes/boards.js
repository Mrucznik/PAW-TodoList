'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/boards',
        options: {
            tags: ['api'],
            handler: {
                tandy: {}
            }
        }
    },
    {
        method: 'GET',
        path: '/boards/{id}',
        options: {
            tags: ['api'],
            handler: {
                tandy: {}
            }
        }
    },
    {
        method: 'GET',
        path: '/boards/{id}/lists',
        options: {
            tags: ['api'],
            handler: {
                tandy: {}
            }
        }
    }
];
