const express = require("express");
const app = express();
const connection = require("./server");
const bodyParser = require("body-parser");
const cors = require("cors");

const loggin = require('./loggin/loggin.api')
const user = require('./user/user.api');
const actas = require('./actas/actas.api')
const gastos = require('./gastos/gastos.api')
const incidencias = require('./incidencias/incidencias.api')
const tipos = require('./tipos/tipo.api')

process.setMaxListeners(0);
connection.connect(function (err) {
  if (err) throw err;
  console.log(
    "Conectado a Finca --> localhost:3000 || Cors enabled, mas info en README"
  );
}); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//create app server
const server = app.listen(3000);

//PAra activar el cors en toda la api
app.use(cors());

app.get("/", function (req, res) {
  res.send("Finca API");
});

//Loggin
loggin.loggin(app);

//USERS
user.allUsers(app);
user.deleteUser(app);
user.newUser(app);
user.updateUser(app);

//ACTAS
actas.allActas(app);
actas.getActa(app);
actas.newActa(app);
actas.editActa(app);
actas.deleteActa(app);

//GASTOS
gastos.allGastos(app);
gastos.newGasto(app)
gastos.gastosByType(app)

//INCIDENCIAS
incidencias.allIncidencias(app);
incidencias.newIncidencia(app)
incidencias.editIncidencia(app);
incidencias.deleteIncidencia(app);

//TIPOS
tipos.allTypesGastos(app);
tipos.allTypeUser(app);
tipos.type(app);