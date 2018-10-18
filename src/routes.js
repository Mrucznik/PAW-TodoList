/**
 * Created by Mrucznik on 01.11.2017.
 */

import Knex from './knex';

const routes = [
    {
        path: 'tables',
        method: 'GET',
        handler:  ( request, reply ) => {
            const getOperation = Knex( 'tables' ).select( 'id', 'name' ).then( ( results ) => {
                // The second one is just a redundant check, but let's be sure of everything.
                if( !results || results.length === 0 ) {
                    reply({
                        error: true,
                        errMessage: 'No tables found',
                    });
                }

                reply({
                    dataCount: results.length,
                    data: results,
                });

            }).catch( ( err ) => {
                reply( 'server-side error' + err );
            });
        }
    }
];
export default routes;

