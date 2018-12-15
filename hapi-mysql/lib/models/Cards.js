'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Cards extends Schwifty.Model {

    static get tableName() {

        return 'cards';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer(),
            name: Joi.string(),
            description: Joi.string(),
            position: Joi.number().integer(),
            deadline: Joi.date().iso(),
            archived: Joi.boolean(),
            list_id: Joi.number().integer()
        }); // eslint-disable-line no-undef
    }

    static get relationMappings() {

        return {
            lists: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: require('./Lists'),
                join: {
                    from: 'lists.id',
                    to: 'cards.list_id'
                }
            },
            comments: {
                relation: Schwifty.Model.HasManyRelation,
                modelClass: require('./Comments'),
                join: {
                    from: 'cards.id',
                    to: 'comments.card_id'
                }
            },
            tasklists: {
                relation: Schwifty.Model.HasManyRelation,
                modelClass: require('./Tasklists'),
                join: {
                    from: 'cards.id',
                    to: 'tasklists.card_id'
                }
            }
        };
    }
};
