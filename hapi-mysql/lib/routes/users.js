'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/user',
        options: {
            description: 'Get current user',
            notes: 'Returns current user with json web token',
            tags: ['api'],
            auth: 'jwt',
            handler: (request, h) => {

                const { credentials: user, artifacts: token } = request.auth;

                return {
                    user: { id: user.id, name: user.name },
                    token
                };
            }
        }
    },
    {
        method: 'GET',
        path: '/user/boards',
        options: {
            description: 'Get current user boards',
            notes: 'Returns current user boards, require token',
            tags: ['api'],
            auth: 'jwt',
            handler: async (request) => {

                const { credentials: user } = request.auth;
                const { Boards } = request.models();

                return await Boards.query().where('user_id', user.id);
            }
        }
    }
];
