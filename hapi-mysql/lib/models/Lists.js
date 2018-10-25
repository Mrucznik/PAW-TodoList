'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Lists extends Schwifty.Model {

    static get tableName() {

        return 'lists';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer(),
            name: Joi.string(),
            list_id: Joi.number().integer()
        }); // eslint-disable-line no-undef
    }

    static get relationMappings() {

        return {
            boards: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: require('./Boards'),
                join: {
                    from: 'boards.id',
                    to: 'lists.board_id'
                }
            },
            cards: {
                relation: Schwifty.Model.HasManyRelation,
                modelClass: require('./Cards'),
                join: {
                    from: 'lists.id',
                    to: 'cards.list_id'
                }
            }
        };
    }
};
