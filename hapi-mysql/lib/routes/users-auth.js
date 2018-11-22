'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'POST',
        path: '/users/login',
        options: {
            description: 'Login',
            notes: 'Login into user account',
            tags: ['api'],
            validate: {
                payload: {
                    name: Joi.string().required(),
                    password: Joi.string().required()
                }
            },
            handler: async (request, h) => {

                const { name, password } = request.payload;
                const { userService } = request.services();

                const login = async (txn) => {

                    return await userService.login({ name, password }, txn);
                };

                const user = await h.context.transaction(login);
                const token = await userService.createToken(user.id);

                return {
                    user: { id: user.id, name: user.name },
                    token
                };
            }
        }
    },
    {
        method: 'POST',
        path: '/users/register',
        options: {
            description: 'Register',
            notes: 'Register new user account',
            tags: ['api'],
            validate: {
                payload: {
                    name: Joi.string().required(),
                    password: Joi.string().required()
                }
            },
            handler: async (request, h) => {

                const { userService } = request.services();

                const signupAndFetchUser = async (txn) => {

                    const id = await userService.signup(request.payload, txn);

                    return await userService.findById(id, txn);
                };

                const user = await h.context.transaction(signupAndFetchUser);
                const token = await userService.createToken(user.id);

                return {
                    user: { id: user.id, name: user.name },
                    token
                };
            }
        }
    }
];
