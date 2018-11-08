'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Users extends Schwifty.Model {

    static get tableName() {

        return 'users';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer(),
            name: Joi.string(),
            password: Joi.binary(),
        }); // eslint-disable-line no-undef
    }
};
