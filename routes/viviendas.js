const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/viviendas");

/**
 * Obtener todas las viviendas
 */
router.get("/viviendas", (req, res) => {
  let filtros = req.query;
  _controlador
    .consultarViviendas(filtros)
    .then((respuestaDB) => {
      let registros = respuestaDB;
      res.send({ ok: true, info: registros, mensaje: "Viviendas consultadas" });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Consultar una viviendas por documento
 */
router.get("/viviendas/:id", (req, res) => {
  let id = req.params.id;
  _controlador
    .consultarVivienda(id)
    .then((respuestaDB) => {
      let registros = respuestaDB.rows;
      let mensaje =
        registros.length > 0 ? "Vivienda consultada." : "Sin registro.";
      res.send({ ok: true, info: registros, mensaje });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Guarda una vivienda
 */
router.post("/viviendas", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_vivienda = req.body;

    // Valida la información, si hay un error se envia al catch
    _controlador.validarVivienda(info_vivienda);

    // Guardar la vivienda en base de datos
    _controlador
      .guardarVivienda(info_vivienda)
      .then((respuestaDB) => {
        res.send({
          ok: true,
          mensaje: "Vivienda guardada",
          info: info_vivienda,
        });
      })
      .catch((error) => {
        res.send(error);
      });

    // Responder
  } catch (error) {
    res.send(error);
  }
});

/**
 * Modificar una vivienda
 */
router.put("/viviendas/:id", (req, res) => {
  // Capturar el parámetro de la ruta
  let id = req.params.id;

  let vivienda = req.body;
  _controlador
    .modificarVivienda(vivienda, id)
    .then((respuestaDB) => {
      res.send({ ok: true, mensaje: "Vivienda modificada", info: vivienda });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Eliminar una vivienda
 */
router.delete("/viviendas/:id", (req, res) => {
  let id = req.params.id;
  _controlador
    .eliminarVivienda(id)
    .then((respuestaDB) => {
      res.send({ ok: true, info: {}, mensaje: "Vivienda eliminada" });
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
