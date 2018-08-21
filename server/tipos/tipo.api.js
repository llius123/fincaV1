var exports = module.exports = {};
const connection = require("../server");

exports.allTypesGastos = function (app) {
    app.get("/allTypesGastos", function (req, res) {
        connection.query("select * from tipogastos ", function (error, result) {
            if (error) console.log(error);
            res.end(res.json(result));
        });
    });
}

exports.allTypeUser = function (app) {
    app.get("/allTypeUser", function (req, res) {
        connection.query("select * from tipousuario ", function (error, result) {
            if (error) console.log(error);
            res.end(res.json(result));
        });
    });
}
exports.gastosByType = function (app) {
    app.get("/gastosByType/:tipo/:order", function (req, res) {
        const querys = "";
        console.log(req.params.order);
        if (req.params.order == 1) {
            this.querys =
                "select g.fecha_recepcion, g.fecha_factura, g.descripcion, g.titulo, t.tipo from gastos g, tipogastos t where g.tipo_id = t.id and t.tipo ='" +
                req.params.tipo +
                "' order by g.fecha_recepcion desc";
        } else if (req.params.order == 2) {
            this.querys =
                "select g.fecha_recepcion, g.fecha_factura, g.descripcion, g.titulo, t.tipo from gastos g, tipogastos t where g.tipo_id = t.id and t.tipo ='" +
                req.params.tipo +
                "' order by g.fecha_factura desc";
        } else {
            this.querys =
                "select g.fecha_recepcion, g.fecha_factura, g.descripcion, g.titulo, t.tipo from gastos g, tipogastos t where g.tipo_id = t.id and t.tipo ='" +
                req.params.tipo +
                "'";
        }
        connection.query(this.querys, function (error, result) {
            if (error) console.log(error);
            res.end(res.json(result));
        });
    });
}

exports.type = function (app) {
    app.get("/type/:number", function (req, res) {
        connection.query(
            "select titulo from tipo where id=?",
            [req.params.number],
            function (error, result) {
                if (error) console.log(error);
                res.end(res.json(result));
            }
        );
    });
}