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
};
