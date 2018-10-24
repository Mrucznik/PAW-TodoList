'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/lists',
        options: {
            description: 'Get all lists',
            notes: 'Returns all lists',
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
            description: 'Get list',
            notes: 'Returns a list by the id passed in path',
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
        path: '/lists/{id}/cards',
        options: {
            description: 'Get list cards',
            notes: 'Returns all cards in list with id passed in path',
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
