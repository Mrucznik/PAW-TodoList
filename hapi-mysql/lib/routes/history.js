'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/history/user',
        options: {
            description: 'Get user action history',
            notes: 'Returns current user action history',
            tags: ['api'],
            auth: 'jwt',
            handler: async (request) => {
                const { credentials: user } = request.auth;
                const { History } = request.models();

                return await History.query().throwIfNotFound().where('user_id', '=', user.id);
            }
        }
    },
    {
        method: 'GET',
        path: '/history/users/{id}',
        options: {
            description: 'Get selected user action history',
            notes: 'Returns action history of user with the given id',
            tags: ['api'],
            auth: 'jwt',
            validate: {
                params: {
                    id: Joi.number().required()
                }
            },
            handler: async (request) => {
                const { History } = request.models();

                return await History.query().throwIfNotFound().where('user_id', '=', request.params.id);
            }
        }
    },
    {
        method: 'GET',
        path: '/history/boards/{id}',
        options: {
            description: 'Get board action history',
            notes: 'Returns the action history of board with the given id',
            tags: ['api'],
            auth: 'jwt',
            validate: {
                params: {
                    id: Joi.number().required()
                }
            },
            handler: async (request) => {
                const { History } = request.models();

                return await History.query().throwIfNotFound().where('board_id', '=', request.params.id);
            }
        }
    }
];
