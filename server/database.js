const http = require("http");
const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const connection = require("./server");
const cors = require("cors");

connection.connect(function(err) {
  if (err) throw err;
  console.log(
    "Conectado a Finca --> localhost:3000 || Cors enabled, mas info en README"
  );
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//create app server
const server = app.listen(3000);

//PAra activar el cors en toda la api
app.use(cors());

app.get("/", function(req, res) {
  res.send("Finca API");
});

app.get("/loggin/:usu/:pass", function(req, res) {
  connection.query(
    "select * from usuario where usuario=? and password=?",
    [req.params.usu, req.params.pass],
    function(error, result) {
      res.end(res.json(result));
    }
  );
});

app.get("/allUsers", function(req, res) {
  connection.query(
    "select id, nombre, telefono, puerta, tipo_id, usuario, password from usuario",
    function(error, result) {
      res.end(res.json(result));
    }
  );
});

app.get("/type/:number", function(req, res) {
  connection.query(
    "select titulo from tipo where id=?",
    [req.params.number],
    function(error, result) {
      res.end(res.json(result));
    }
  );
});

app.get("/test/:id&:name", function(req, res) {
  connection.query(
    "select * from usuario where id=? and nombre=?",
    [req.params.id, req.params.name],
    function(error, result) {
      res.end(res.json(result));
    }
  );
});

app.post("/newUser/:id&:name&:phone&:door&:type_id&:user&:pas", function(
  req,
  res
) {
  connection.query(
    "insert into Usuario(id,nombre,telefono,puerta,tipo_id,usuario,password) values(?,?,?,?,?,?,?)",
    [
      req.params.id,
      req.params.name,
      req.params.phone,
      req.params.door,
      req.params.type_id,
      req.params.user,
      req.params.pas
    ],
    function(result) {
      res.end();
    }
  );
});

app.put("/updateUser/:name&:phone&:door&:user&:pas&:id", function(req, res) {
  connection.query(
    "update usuario set nombre = ?, telefono = ?, puerta = ?, usuario = ?, password = ? where id = ?",
    [
      req.params.name,
      req.params.phone,
      req.params.door,
      req.params.user,
      req.params.pas,
      req.params.id
    ],
    function(error, result, fields) {
      res.end();
    }
  );
});

app.get("/allActas", function(req, res) {
  connection.query("select * from Actas ", function(error, result) {
    res.end(res.json(result));
  });
});

app.get("/acta/:id", function(req, res) {
  connection.query("select * from Actas where id=?", [req.params.id], function(
    error,
    result
  ) {
    res.end(res.json(result));
  });
});

app.get("/allGastos", function(req, res) {
  connection.query(
    "select g.id,g.numero_factura,t.tipo,g.fecha_recepcion,g.fecha_factura,g.descripcion,g.titulo  from gastos g, tipogastos t where g.tipo_id = t.id",
    [req.params.id],
    function(error, result) {
      res.end(res.json(result));
    }
  );
});

app.put("/newIncidencia/:titulo&:descripcion", function(req, res) {
  connection.query(
    "insert into incidencias set titulo=?, descripcion=?",
    [req.params.titulo, req.params.descripcion],
    function(error, result) {
      res.end(res.json(result));
    }
  );
});

app.get("/allTypesGastos", function(req, res) {
  connection.query("select * from tipogastos", function(error, result) {
    res.end(res.json(result));
  });
});

app.get("/gastosByType/:tipo", function(req, res) {
  connection.query(
    "select g.fecha_recepcion, g.fecha_factura, g.descripcion, g.titulo, t.tipo from gastos g, tipogastos t where g.tipo_id = t.id and t.tipo = 'agua'",
    function(error, result) {
      res.end(res.json(result));
    });
});

// app.put("/updateUser/:id&:name&:phone&:door&:type_id&:user&:pas", function(req,res) {
//   connection.query(
//     "update Usuario where id = ? and nombre = ? and telefono = ? and puerta = ? and tipo_id = ? and usuario = ? and password = ? ",
//         [
//       req.params.id,
//       req.params.name,
//       req.params.phone,
//       req.params.door,
//       req.params.type_id,
//       req.params.user,
//       req.params.pas
//     ],
//     function(error, result){
//       console.log(error);
//     }
//   );
// });
// app.post("/updateUser/:id/:name/:phone/:type_id/:user/:pas", function (req, res){
// connection.query(
//   "insert into Usuario(id,nombre,telefono,tipo_id,usuario,password) values(?,?,?,?,?,?)"
// )
// })

// //rest api to get all customers
// app.get('/test', function (req, res) {
//    connection.query('select * from categoria', function (error, result, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(result));
// 	});
// });
// //rest api to get a single customer data
// app.get('/customer/:id', function (req, res) {
//    connection.query('select * from customers where Id=?', [req.params.id], function (error, result, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(result));
// 	});
// });

// //rest api to create a new customer record into mysql database
// app.post('/customer', function (req, res) {
//    const params  = req.body;
//    console.log(params);
//    connection.query('INSERT INTO customer SET ?', params, function (error, result, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(result));
// 	});
// });

// //rest api to update record into mysql database
// app.put('/customer', function (req, res) {
//    connection.query('UPDATE `customer` SET `Name`=?,`Address`=?,`Country`=?,`Phone`=? where `Id`=?', [req.body.Name,req.body.Address, req.body.Country, req.body.Phone, req.body.Id], function (error, result, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(result));
// 	});
// });

// //rest api to delete record from mysql database
// app.delete('/customer', function (req, res) {
//    console.log(req.body);
//    connection.query('DELETE FROM `customer` WHERE `Id`=?', [req.body.Id], function (error, result, fields) {
// 	  if (error) throw error;
// 	  res.end('Record has been deleted!');
// 	});
// });
