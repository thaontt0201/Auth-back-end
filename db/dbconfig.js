const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5433,
  database: "customer",
  password: process.env.DB_PASSWORD,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
