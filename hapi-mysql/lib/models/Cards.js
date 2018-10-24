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
            board_id: Joi.number().integer()
        }); // eslint-disable-line no-undef
    }
};
