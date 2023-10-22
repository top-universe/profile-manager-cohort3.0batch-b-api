require("dotenv").config(); //Configuration to access the dotenv environment variables

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};

// To run knex migrations
// npx knex migrate:make create_product_table
// npx knex migrate:make create_product_category_table
