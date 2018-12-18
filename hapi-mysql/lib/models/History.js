'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class History extends Schwifty.Model {

    static get tableName() {

        return 'history';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer(),
            action: Joi.string(),
            description: Joi.string(),
            date: Joi.date().iso(),
            user_id: Joi.number().integer(),
            board_id: Joi.number().integer()
        }); // eslint-disable-line no-undef
    }

    static get relationMappings() {

        return {
            'history-users': {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: require('./Users'),
                join: {
                    from: 'users.id',
                    to: 'history.user_id'
                }
            },
            'history-boards': {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: require('./Boards'),
                join: {
                    from: 'boards.id',
                    to: 'history.user_id'
                }
            }
        };
    }
};
