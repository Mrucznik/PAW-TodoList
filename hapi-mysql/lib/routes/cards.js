'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/cards',
        options: {
            description: 'Get all cards',
            notes: 'Returns all cards',
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
            description: 'Get card',
            notes: 'Returns a card by the id passed in path',
            tags: ['api'],
            validate: {
                params: {
                    id: Joi.number()
                }
            },
            handler: {
                tandy: {}
            }
        }
    },
    {
        method: 'PATCH',
        path: '/cards/{id}',
        options: {
            description: 'Modify a card',
            notes: 'Modify name of a card',
            tags: ['api'],
            validate: {
                params: {
                    id: Joi.number().required()
                },
                payload: {
                    name: Joi.string().required()
                }
            }
        },
        handler: {
            tandy: {}
        }
    }
];
