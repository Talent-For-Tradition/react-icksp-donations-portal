// Update with your config settings.
require("dotenv").config("../../.env");

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./database/migrations",
      tableName: "knex_migrations"
    }
  },
  test: {
    client: "sqlite3",
    connection: () => ({
      filename: process.env.SQLITE_FILENAME
    }),
    migrations: {
      directory: "./database/migrations",
      tableName: "knex_migrations"
    }
  }
};
