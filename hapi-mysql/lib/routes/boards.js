'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/boards',
        options: {
            description: 'Get all boards',
            notes: 'Returns all boards',
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
            description: 'Get board',
            notes: 'Returns a board by the id passed in path',
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
        method: 'GET',
        path: '/boards/{id}/lists',
        options: {
            description: 'Get board lists',
            notes: 'Returns all list in board with id passed in path',
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
    }
];
