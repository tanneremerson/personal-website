export default {
  development: {
    client: 'mysql',
    asyncStackTraces: true,
    connection: {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      // Local does not provide secure connection
      // ssl: true
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'mysql',
    asyncStackTraces: true,
    connection: {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      ssl: true
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
