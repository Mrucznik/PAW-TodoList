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
                    position: Joi.number().integer().optional()
                })).min(1)
            }
        },
        handler: {
            tandy: {}
        }
    },
    {
        method: 'GET',
        path: '/cards/{id}/comments',
        options: {
            description: 'Get a card comment',
            notes: 'Get comment from card of specified id.',
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
    },
    {
        method: 'POST',
        path: '/cards/{id}/comments',
        options: {
            description: 'Create a card comment',
            notes: 'Adds comment to card of specified id.',
            tags: ['api'],
            auth: 'jwt',
            validate: {
                params: {
                    id: Joi.number().required()
                },
                payload: {
                    message: Joi.string().required()
                }
            }
        },
        handler: async (request) => {

            const { credentials: user } = request.auth;
            const { Comments } = request.models();
            const comment = request.payload;

            return await Comments.query().insertAndFetch({ message: comment.message, user_id: user.id, card_id: request.params.id });
        }
    }
];
