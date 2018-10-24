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
            name: Joi.string()
        }); // eslint-disable-line no-undef
    }
};
