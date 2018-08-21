var exports = module.exports = {};
const connection = require("../server");

exports.allUsers = function (app) {
  app.get("/allUsers", function (req, res) {
    connection.query(
      "select u.id,u.nombre,u.telefono,u.puerta,t.titulo,u.usuario,u.password, u.tipo_id from usuario u,tipousuario t where t.id = u.tipo_id order by u.id",
      function (error, result) {
        if (error) console.log(error);
        res.end(res.json(result));
      }
    );
  });
}

exports.deleteUser = function (app) {
  app.delete("/deleteUser/:id", function (req, res) {
    connection.query(
      "delete from usuario where id = ?",
      [req.params.id],
      function (error, result) {
        if (error) console.log(error);
        res.end(res.json(result));
      }
    );
  });
}

exports.newUser = function (app) {
  app.post("/newUser/:name&:phone&:door&:type_id&:user&:pas", function (req, res) {
    connection.query(
      "insert into usuario(nombre,telefono,puerta,tipo_id,usuario,password) values(?,?,?,?,?,?)",
      [
        req.params.name,
        req.params.phone,
        req.params.door,
        req.params.type_id,
        req.params.user,
        req.params.pas
      ],
      function (result, error) {
        if (error) console.log(error);
        res.end(JSON.stringify(result));
      }
    );
  });
}

exports.updateUser = function (app) {
  app.put("/updateUser/:name&:phone&:door&:title&:user&:pas&:id", function (
    req,
    res
  ) {
    connection.query(
      " update usuario  set nombre = ?, telefono = ?, puerta = ?, tipo_id = ?, usuario = ?, password = ? where id = ? ",
      [
        req.params.name,
        req.params.phone,
        req.params.door,
        req.params.title,
        req.params.user,
        req.params.pas,
        req.params.id
      ],
      function (error, result, fields) {
        if (error) console.log(error);
        res.end(JSON.stringify(result));
      }
    );
  });
}
exports.test = function (app) {
  app.get("/test/:id&:name", function (req, res) {
    connection.query(
      "select * from usuario where id=? and nombre=?",
      [req.params.id, req.params.name],
      function (error, result) {
        if (error) console.log(error);
        res.end(res.json(result));
      }
    );
  });
}