'use strict';

const session = require('../../server/neo4j');

module.exports = {
    method: 'GET',
    path: '/test',
    options: {
        tags: ['api'],
        description: 'Test endpoint',
        notes: 'Returns nothing',
        handler: (request, h) => {
            //language=Cypher
            const query = 'MATCH (x:Test) RETURN x';

            return session.run(query
            ).then( (result) => {
                session.close();
                return result;
            }).catch((error) => {
                console.log(error);
            });
        }
    }
};
