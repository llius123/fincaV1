var exports = module.exports = {};
const connection = require("../server");

exports.allGastos = function (app) {
    app.get("/allGastos", function (req, res) {
        connection.query(
            "select g.id,t.tipo,g.fecha_recepcion,g.fecha_factura,g.descripcion,g.tipo_id  from gastos g, tipogastos t where g.tipo_id = t.id order by g.fecha_recepcion desc",
            [req.params.id],
            function (error, result) {
                if (error) console.log(error);
                res.end(res.json(result));
            }
        );
    });
}

exports.newGasto = function (app) {
    app.post("/newGastos/:tipo_id&:recepcion&:factura&:descripcion", function (
        req,
        res
    ) {
        connection.query(
            "insert into gastos set tipo_id = ?, fecha_recepcion = ?, fecha_factura = ?, descripcion = ?",
            [
                req.params.tipo_id,
                req.params.recepcion,
                req.params.factura,
                req.params.descripcion
            ],
            function (error, result) {
                if (error) console.log(error);
                res.end(res.json(result));
            }
        );
    });
}

exports.editGasto = function (app) {
    app.put("/editGastos/:tipo_id&:recepcion&:factura&:descripcion&:id", function (
        req,
        res
    ) {
        connection.query(
            "update gastos set tipo_id = ?, fecha_recepcion = ?, fecha_factura = ?, descripcion = ? where id = ?",
            [
                req.params.tipo_id,
                req.params.recepcion,
                req.params.factura,
                req.params.descripcion,
                req.params.id
            ],
            function (error, result) {
                if (error) throw error;
                res.end(res.json(result));
            }
        );
    });
}

exports.deleteGasto = function (app) {
    app.delete("/deleteGastos/:id", function (req, res) {
        connection.query("delete from gastos where id = ?", [req.params.id], function (
            error,
            result
        ) {
            if (error) console.log(error);
            res.end(res.json(result));
        });
    });
}