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
            }
        };
    }
};
