'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Mrucznik on 01.11.2017.
 */

var server = new _hapi2.default.Server();

server.connection({
    port: 8080
});

server.register(function (err) {
    _routes2.default.forEach(function (route) {
        console.log('attaching ' + route.path);
        server.route(route);
    });
});

server.start(function (err) {
    if (err) {
        // Fancy error handling here
        console.error('Error was handled!');
        console.error(err);
    }

    console.log('Server started at ' + server.info.uri);
});