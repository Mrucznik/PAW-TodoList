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
            auth: 'jwt',
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
            auth: 'jwt',
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
            notes: 'Modify name, description or position of a card',
            tags: ['api'],
            auth: 'jwt',
            validate: {
                params: {
                    id: Joi.number().required()
                },
                payload: Joi.object().keys(({
                    name: Joi.string().optional(),
                    description: Joi.string().optional(),
                    position: Joi.number().integer().optional(),
                    archived: Joi.boolean().optional()
                })).min(1)
            }
        },
        handler: {
            tandy: {}
        }
    },
    {
        method: 'GET',
        path: '/lists/{id}/cards',
        options: {
            description: 'Get list cards',
            notes: 'Returns all cards in list with id passed in path',
            tags: ['api'],
            auth: 'jwt',
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
        method: 'POST',
        path: '/lists/{id}/cards',
        options: {
            description: 'Create new card in list',
            notes: 'Create new card associated with list of secified id',
            tags: ['api'],
            auth: 'jwt',
            validate: {
                params: {
                    id: Joi.number().required()
                },
                payload: {
                    name: Joi.string().required(),
                    description: Joi.string().optional(),
                    position: Joi.number().integer().required()
                }
            }
        },
        handler: {
            tandy: {}
        }
    }
];
