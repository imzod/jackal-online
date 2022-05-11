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
      database: 'd1cavrlsdgopnk',
      user: 'gcwjiabjhoylij',
      password: '454a386d7afa8bdc40fac0b599c2e73af94ceb69b148f202d3d581dc4a44eea6',
      host: 'ec2-34-236-94-53.compute-1.amazonaws.com',
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