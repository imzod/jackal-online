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
      database: 'depoj3vtsmujsd',
      user: 'mwzjjimxsiqiqs',
      password: '04000fb9e8e50128d1972cda62ab3e37d9679c049ee58ba2c6b9242352894a9b',
      host: 'ec2-52-3-200-138.compute-1.amazonaws.com',
      port: 5432,
      ssl: { rejectUnauthorized: false }
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