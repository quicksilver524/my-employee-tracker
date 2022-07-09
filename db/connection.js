const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "seahorse",
  password: "Ilovejennyluu524**",
});

module.exports = db;
