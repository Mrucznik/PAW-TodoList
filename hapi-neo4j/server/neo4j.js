'use strict';

const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver(process.env.DB_HOST, neo4j.auth.basic(process.env.DB_USER, process.env.DB_PASS));
const session = driver.session();

module.exports = session;

