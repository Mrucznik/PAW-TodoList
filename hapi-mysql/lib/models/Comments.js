'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Comments extends Schwifty.Model {

    static get tableName() {

        return 'comments';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer(),
            message: Joi.string(),
            date: Joi.date().iso(),
            user_id: Joi.number().integer(),
            card_id: Joi.number().integer()
        }); // eslint-disable-line no-undef
    }

    static get relationMappings() {

        return {
            comments: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: require('./Cards'),
                join: {
                    from: 'cards.id',
                    to: 'comments.card_id'
                }
            },
            users: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: require('./Users'),
                join: {
                    from: 'users.id',
                    to: 'comments.user_id'
                }
            }
        };
    }
};
