'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _knex = require('./knex');

var _knex2 = _interopRequireDefault(_knex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
    path: 'tables',
    method: 'GET',
    handler: function handler(request, reply) {
        var getOperation = (0, _knex2.default)('tables').select('id', 'name').then(function (results) {
            // The second one is just a redundant check, but let's be sure of everything.
            if (!results || results.length === 0) {
                reply({
                    error: true,
                    errMessage: 'No tables found'
                });
            }

            reply({
                dataCount: results.length,
                data: results
            });
        }).catch(function (err) {
            reply('server-side error' + err);
        });
    }
}]; /**
     * Created by Mrucznik on 01.11.2017.
     */

exports.default = routes;