'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Cards extends Schwifty.Model {

    static get tableName() {

        return 'tasklists';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer(),
            title: Joi.string(),
            checked: Joi.boolean(),
            card_id: Joi.number().integer()
        }); // eslint-disable-line no-undef
    }

    static get relationMappings() {

        return {
            cards: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: require('./Cards'),
                join: {
                    from: 'cards.id',
                    to: 'tasklists.card_id'
                }
            },
            'tasklist-items': {
                relation: Schwifty.Model.HasManyRelation,
                modelClass: require('./TasklistItems'),
                join: {
                    from: 'tasklists.id',
                    to: 'tasklists-items.tasklist_id'
                }
            }
        };
    }
};
