// Update with your config settings.
//require('dotenv').config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
//const {dbName, dbUser, dbPassword, dbHost} = process.env

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'bbjwwkfl',
      user: 'bbjwwkfl',
      password: 'XenQZvlfBP3Y2wI7GkeN6JYQCSiyRbcN',
      host: 'tiny.db.elephantsql.com',
      port: 5432,
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  },

  /*staging: {
      client: 'postgresql',
      connection: {
          database: 'my_db',
          user: 'username',
          password: 'password'
      },
      pool: {
          min: 2,
          max: 10
      },
      migrations: {
          tableName: 'knex_migrations'
      }
  },

  production: {
      client: 'postgresql',
      connection: {
          database: 'my_db',
          user: 'username',
          password: 'password'
      },
      pool: {
          min: 2,
          max: 10
      },
      migrations: {
          tableName: 'knex_migrations'
      }
  }*/

};