'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/cards/{id}/tasklists',
        options: {
            description: 'Get all tasklists from cards',
            notes: 'Returns all tasklists with task items',
            tags: ['api'],
            auth: 'jwt',
            handler: async (request) => {

                const { Tasklists } = request.models();

                return await Tasklists.query().findById(request.params.id).eager('tasklists.[tasklist-items]');
            }
        }
    },
    {
        method: 'POST',
        path: '/cards/{id}/tasklists',
        options: {
            description: 'Create new tasklist',
            notes: 'Create new tasklist associated with card of secified id',
            tags: ['api'],
            auth: 'jwt',
            validate: {
                params: {
                    id: Joi.number().required()
                },
                payload: {
                    title: Joi.string().required()
                }
            }
        },
        handler: {
            tandy: {}
        }
    },
    {
        method: 'PATCH',
        path: '/tasklists/{id}',
        options: {
            description: 'Modify tasklist',
            notes: 'Modify tasklist of secified id',
            tags: ['api'],
            auth: 'jwt',
            validate: {
                params: {
                    id: Joi.number().required()
                },
                payload: {
                    title: Joi.string().required()
                }
            }
        },
        handler: {
            tandy: {}
        }
    },
    {
        method: 'DELETE',
        path: '/tasklists/{id}',
        options: {
            description: 'Delete tasklist',
            notes: 'Delete tasklist of secified id',
            tags: ['api'],
            auth: 'jwt',
            validate: {
                params: {
                    id: Joi.number().required()
                }
            }
        },
        handler: {
            tandy: {}
        }
    }
];
