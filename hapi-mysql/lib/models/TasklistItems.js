'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class TasklistItems extends Schwifty.Model {

    static get tableName() {

        return 'tasklist-items';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer(),
            name: Joi.string(),
            tasklist_id: Joi.number().integer()
        }); // eslint-disable-line no-undef
    }

    static get relationMappings() {

        return {
            tasklist: {
                relation: Schwifty.Model.BelongsToOneRelation,
                modelClass: require('./Tasklists'),
                join: {
                    from: 'tasklists.id',
                    to: 'tasklist-items.tasklist_id'
                }
            }
        };
    }
};
