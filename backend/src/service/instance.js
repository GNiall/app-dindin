const { Pool } = require("pg");

const pool = new Pool({
  port: 5432,
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "dindin",
});

module.exports = pool;
