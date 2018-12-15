'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'POST',
        path: '/tasklists/{id}/tasklist-items',
        options: {
            description: 'Create new tasklist item',
            notes: 'Create new tasklist item associated with tasklist of secified id',
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
        method: 'PATCH',
        path: '/tasklist-items/{id}',
        options: {
            description: 'Modify tasklist item',
            notes: 'Modify tasklist of secified id',
            tags: ['api'],
            auth: 'jwt',
            validate: {
                params: {
                    id: Joi.number().required()
                },
                payload: Joi.object().keys(({
                    name: Joi.string().optional(),
                    checked: Joi.boolean().optional()
                })).min(1)
            }
        },
        handler: {
            tandy: {}
        }
    },
    {
        method: 'DELETE',
        path: '/tasklist-items/{id}',
        options: {
            description: 'Delete a tasklist item',
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
