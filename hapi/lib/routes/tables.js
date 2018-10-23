'use strict';

const session = require('../../server/neo4j');

module.exports = {
    method: 'GET',
    path: '/tables',
    options: {
        handler: (request, h) => {
            //language=Cypher
            const query = 'MATCH (tm:ThingMark) RETURN tm';

            session.run(query
            ).then( (result) => {
                console.log('gut gut');
                session.close();
            }).catch((error) => {
                console.log(error);
            });

            return 'kek';
        }
    }
};
