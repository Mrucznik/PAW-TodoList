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
            auth: 'jwt',
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
        path: '/lists/{id}',
        options: {
            description: 'Modify a list',
            notes: 'Modify name of a list',
            tags: ['api'],
            auth: 'jwt',
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
    },
    {
        method: 'GET',
        path: '/boards/{id}/lists',
        options: {
            description: 'Get board lists',
            notes: 'Returns all list in board with id passed in path',
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
        path: '/boards/{id}/lists',
        options: {
            description: 'Create new list in board',
            notes: 'Create new list associated with board of secified id',
            tags: ['api'],
            auth: 'jwt',
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
    },
    //ordering
    {
        method: 'GET',
        path: '/lists/{id}/cards/order',
        options: {
            description: 'Get cards order',
            notes: 'Returns cards order as list of card IDs',
            tags: ['api'],
            auth: 'jwt',
            validate: {
                params: {
                    id: Joi.number().required()
                }
            },
            handler: async (request) => {

                const { Cards } = request.models();

                return (await Cards.query().throwIfNotFound().select('id').where('list_id', '=', request.params.id).orderBy('position')).map((e) => e.id);
            }
        }
    },
    {
        method: 'POST',
        path: '/lists/{id}/cards/order',
        options: {
            description: 'Get all cards',
            notes: 'Set cards order as list of card IDs',
            tags: ['api'],
            auth: 'jwt',
            validate: {
                params: {
                    id: Joi.number().required()
                },
                payload: {
                    order: Joi.array().single(true).min(1).items(Joi.number().integer())
                }
            },
            handler: async (request, h) => {

                const { Cards } = request.models();

                let i = 0;
                for (const id of request.payload.order) {
                    await Cards.query().patch({ 'position': ++i }).where('id', '=', id).throwIfNotFound();
                }

                return await h.response().code(201);
            }
        }
    }
];
