'use strict';

const Joi = require('joi');

module.exports = [
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
    },
    {
        method: 'DELETE',
        path: '/comments/{id}',
        options: {
            description: 'Delete a card comment',
            notes: 'Delete comment of specified id.',
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
        method: 'PATCH',
        path: '/comments/{id}',
        options: {
            description: 'Modify comment',
            notes: 'Modify a comment of specified id.',
            tags: ['api'],
            auth: 'jwt',
            validate: {
                params: {
                    message: Joi.string().required()
                }
            }
        },
        handler: {
            tandy: {}
        }
    }
];
