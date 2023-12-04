const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "jesus321",
  host: process.env.SQL_PASS,
  port: 5432,
  database: "perntodo"
})

module.exports = pool;