var exports = module.exports = {};
const connection = require("../server");

exports.allIncidencias = function (app) {
    app.get("/allIncidencia", function (req, res) {
        connection.query(
            "select * from incidencias order by id",
            function (error, result) {
                if (error) console.log(error);
                res.end(res.json(result));
            }
        )
    })
}

exports.newIncidencia = function (app) {
    app.put("/newIncidencia/:titulo&:descripcion", function (req, res) {
        connection.query(
            "insert into incidencias set titulo=?, descripcion=?",
            [req.params.titulo, req.params.descripcion],
            function (error, result) {
                if (error) console.log(error);
                res.end(res.json(result));
            }
        );
    });
}

exports.editIncidencia = function (app) {
    app.put("/editIncidencia/:id&:titulo&:descripcion", function (req, res) {
        connection.query(
            "update incidencias set titulo = ?, descripcion = ? where id = ?",
            [req.params.titulo, req.params.descripcion, req.params.id],
            function (error, result) {
                if (error) console.log(error);
                res.end(res.json(result));
            }
        );
    })
}

exports.deleteIncidencia = function (app) {
    app.delete("/deleteIncidencia/:id", function (req, res) {
        connection.query(
            "delete from incidencias where id = ?",
            [req.params.id],
            function (error, result) {
                if (error) console.log(error);
                res.end(res.json(result));
            }
        )
    })
}