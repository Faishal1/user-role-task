const database = {
    client: 'mysql2',
    connection: {
      port: 3306,
      host: '127.0.0.1',
      database: 'appiness-task',
      user: 'root',
      password: 'root',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './database/seeders/development',
    },
    debug: true,
  };

  module.exports = database;
