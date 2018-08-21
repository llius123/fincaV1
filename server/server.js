const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  //password: "mellamojesus1361",
  database: "finca"
});

module.exports = connection;
