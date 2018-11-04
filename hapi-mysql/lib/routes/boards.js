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
    },
    {
        method: 'GET',
        path: '/boards/{id}/lists/cards',
        options: {
            description: 'Get board lists and cards',
            notes: 'Returns a board with lists containing cards',
            tags: ['api'],
            validate: {
                params: {
                    id: Joi.number()
                }
            },
            handler: async (request) => {

                const { Boards } = request.models();
                const { Lists } = request.models();

                return await Boards.query().findById(request.params.id).eager('lists.[cards]');
            }
        }
    },
    {
        method: 'POST',
        path: '/boards',
        options: {
            description: 'Create new board',
            tags: ['api'],
            validate: {
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
        method: 'POST',
        path: '/boards/{id}/lists',
        options: {
            description: 'Create new list in board',
            notes: 'Create new list associated with board of secified id',
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
    },
    {
        method: 'PATCH',
        path: '/boards/{id}',
        options: {
            description: 'Modify a board',
            notes: 'Modify name of a board',
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
