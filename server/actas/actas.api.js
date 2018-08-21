var exports = module.exports = {};
const connection = require("../server");

exports.allActas = function (app) {
    app.get("/allActas", function (req, res) {
        connection.query("select * from Actas", function (error, result) {
            if (error) console.log(error);
            res.end(res.json(result));
        });
    });
}

exports.getActa = function (app) {
    app.get("/acta/:id", function (req, res) {
        connection.query("select * from Actas where id=?", [req.params.id], function (
            error,
            result
        ) {
            if (error) console.log(error);
            res.end(res.json(result));
        });
    });
}

exports.newActa = function (app) {
    app.post("/newActa/:fecha&:descripcion&:textoCompleto", function (req, res) {
        connection.query(
            "insert into actas set fecha = ?, textoCompleto = ?, descripcion = ?",
            [req.params.fecha, req.params.textoCompleto, req.params.descripcion],
            function (error, result) {
                if (error) console.log(error);
                res.end(res.json(result));
            }
        );
    });
}

exports.editActa = function (app) {
    app.put("/editActa/:fecha&:descripcion&:textoCompleto&:id", function (req, res) {
        connection.query(
            "update actas set fecha = ?, descripcion = ?, textoCompleto = ? where id = ?",
            [
                req.params.fecha,
                req.params.descripcion,
                req.params.textoCompleto,
                req.params.id
            ],
            function (error, result) {
                if (error) throw error;
                res.end(res.json(result));
            }
        );
    });
}

exports.deleteActa = function (app) {
    app.delete("/deleteActa/:id", function (req, res) {
        connection.query("delete from actas where id = ?", [req.params.id], function (
            error,
            result
        ) {
            if (error) console.log(error);
            res.end(res.json(result));
        });
    });
}