var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mellamojesus1361",
  database: "finca"
});
module.exports = con;
