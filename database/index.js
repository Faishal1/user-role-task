import KNEX from 'knex';
import database from '../knexfile';

// Adding connection check code to config
// config.database.pool.afterCreate = async (conn, done) => {
//   done();
// };

const knex = new KNEX(database);
console.log(`Running latest migrations.`);

export default knex;
