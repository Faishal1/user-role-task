// Actual pluralized table name in db
import { statusTypes } from '../../helpers/contants';
const dbTableName = 'user_roles';

// https://knexjs.org/#Migrations-make

/*
  to run migrations, follow this steps:
  1. export your NODE_ENV
  2. npm run knex migrate:latest;
*/

/*
  Add altering commands here.
  Return a promise to correctly handle asynchronicity.

  export const up = knex =>
   knex.schema.createTable('users', t => { t.increments('id').primary(); });
  Example:
  */
export const up = async knex =>
  knex.schema.createTable(dbTableName, table => {
    table.increments('id').primary();
  table.enu('status', statusTypes).defaultTo(statusTypes[0]);
  table
    .dateTime('created_at')
    .notNullable()
    .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  table
    .dateTime('updated_at')
    .notNullable()
    .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.integer('user_id').unsigned()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE'); // if referenced project is deleted, delete this.
    table.string('role');
  });

/*
  Add reverting commands here.
  Return a promise to correctly handle asynchronicity.

  Example:
  export const down = knex => knex.schema.dropTable('users');
*/
export const down = async knex => knex.schema.dropTable(dbTableName);
