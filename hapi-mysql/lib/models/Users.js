'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Users extends Schwifty.Model {

    static get tableName() {

        return 'users';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer(),
            name: Joi.string(),
            password: Joi.binary(),
        }); // eslint-disable-line no-undef
    }

    static get relationMappings() {

        return {
            boards: {
                relation: Schwifty.Model.HasManyRelation,
                modelClass: require('./Boards'),
                join: {
                    from: 'users.id',
                    to: 'boards.user_id'
                }
            },
            comments: {
                relation: Schwifty.Model.HasManyRelation,
                modelClass: require('./Comments'),
                join: {
                    from: 'users.id',
                    to: 'comments.user_id'
                }
            },
            'history-users': {
                relation: Schwifty.Model.HasManyRelation,
                modelClass: require('./History'),
                join: {
                    from: 'users.id',
                    to: 'history.user_id'
                }
            }
        };
    }
};
