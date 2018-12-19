'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/boards',
        options: {
            description: 'Get boards',
            notes: 'Returns all boards',
            tags: ['api'],
            auth: 'jwt',
            handler: {
                tandy: {}
            }
        }
    },
    {
        method: 'GET',
        path: '/boards/{id}/lists/cards',
        options: {
            description: 'Get board lists and cards',
            notes: 'Returns a board with lists containing cards',
            tags: ['api'],
            auth: 'jwt',
            validate: {
                params: {
                    id: Joi.number()
                }
            },
            handler: async (request) => {

                const { Boards } = request.models();

                return await Boards.query().throwIfNotFound().findById(request.params.id).eager('lists.[cards(orderByPosition)]');
            }
        }
    },
    {
        method: 'POST',
        path: '/boards',
        options: {
            description: 'Create new board',
            tags: ['api'],
            auth: 'jwt',
            validate: {
                payload: {
                    name: Joi.string().required(),
                    locked: Joi.boolean().optional()
                }
            }
        },
        handler: {
            tandy: {}
        }
    },
    {
        method: 'PATCH',
        path: '/boards/{id}',
        options: {
            description: 'Modify a board',
            notes: 'Modify name of a board',
            tags: ['api'],
            auth: 'jwt',
            validate: {
                params: {
                    id: Joi.number().required()
                },
                payload: Joi.object().keys(({
                    name: Joi.string().optional(),
                    locked: Joi.boolean().optional()
                })).min(1)
            }
        },
        handler: {
            tandy: {}
        }
    }
];
