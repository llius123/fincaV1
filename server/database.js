const http = require("http");
const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const connection = require("./server");

connection.connect(function(err) {
  if (err) throw err;
  console.log("Conectado a Finca --> localhost:3000");
});
//end mysql connection

//start body-parser configuration
// app.use(bodyParser.json()); // to support JSON-encoded bodies
// app.use(
//   bodyParser.urlencoded({
//     // to support URL-encoded bodies
//     extended: true
//   })
// );
//end body-parser configuration

//create app server
const server = app.listen(3000);

app.get("/", function(req, res) {
  res.send("Finca API");
});

app.get("/loggin/:usu/:pass", function(req, res) {
  connection.query(
    "select * from usuario where nombre=? and password=?",
    [req.params.usu, req.params.pass],
    function(error, results) {
      const dataString = JSON.stringify(results);
      //Transformo el array String de JSON en un array JSON
      //const dataJson = JSON.parse(dataString);
      res.end(dataString);
    }
  );
});

app.get("/allUsers", function(req, res) {
  connection.query("select id, nombre, telefono, puerta, tipo_id from usuario", function(error, results) {
    const dataString = JSON.stringify(results);
    res.end(dataString);
  });
});

app.get("/type/:number", function (req, res) {
  connection.query(
    "select titulo from tipo where id=?",
    [req.params.number],
    function(error, result) {
      const dataString = JSON.stringify(result);
      res.end(dataString);
    }
  );
});

// //rest api to get all customers
// app.get('/test', function (req, res) {
//    connection.query('select * from categoria', function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });
// //rest api to get a single customer data
// app.get('/customer/:id', function (req, res) {
//    connection.query('select * from customers where Id=?', [req.params.id], function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });

// //rest api to create a new customer record into mysql database
// app.post('/customer', function (req, res) {
//    const params  = req.body;
//    console.log(params);
//    connection.query('INSERT INTO customer SET ?', params, function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });

// //rest api to update record into mysql database
// app.put('/customer', function (req, res) {
//    connection.query('UPDATE `customer` SET `Name`=?,`Address`=?,`Country`=?,`Phone`=? where `Id`=?', [req.body.Name,req.body.Address, req.body.Country, req.body.Phone, req.body.Id], function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });

// //rest api to delete record from mysql database
// app.delete('/customer', function (req, res) {
//    console.log(req.body);
//    connection.query('DELETE FROM `customer` WHERE `Id`=?', [req.body.Id], function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end('Record has been deleted!');
// 	});
// });
