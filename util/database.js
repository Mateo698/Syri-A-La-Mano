const { Pool } = require("pg");

var db;

if (!db) {
  db = new Pool({
    host: "localhost",
    user: "postgres",
    database: "syri",
    password: "password",
    port: 5432,
  });
}

export default db;