'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Boards extends Schwifty.Model {

    static get tableName() {

        return 'boards';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer(),
            name: Joi.string(),
            locked: Joi.boolean(),
            user_id: Joi.number().integer()
        }); // eslint-disable-line no-undef
    }

    static get relationMappings() {

        return {
            users: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: require('./Users'),
                join: {
                    from: 'users.id',
                    to: 'boards.user_id'
                }
            },
            lists: {
                relation: Schwifty.Model.HasManyRelation,
                modelClass: require('./Lists'),
                join: {
                    from: 'boards.id',
                    to: 'lists.board_id'
                }
            },
            'history-boards': {
                relation: Schwifty.Model.HasManyRelation,
                modelClass: require('./History'),
                join: {
                    from: 'boards.id',
                    to: 'history.board_id'
                }
            }
        };
    }
};
