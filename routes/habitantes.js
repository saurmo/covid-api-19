const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/habitantes");

/**
 * Obtener todas las habitantes
 */
router.get("/habitantes", (req, res) => {
  let filtros = req.query;
  _controlador
    .consultarHabitantes(filtros)
    .then((respuestaDB) => {
      let registros = respuestaDB;
      res.send({
        ok: true,
        info: registros,
        mensaje: "Habitantes consultados",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Consultar una habitantes por documento
 */
router.get("/habitantes/:id_vivienda/:id_persona?", (req, res) => {
  let id_vivienda = req.params.id_vivienda;
  let id_persona = req.params.id_persona;
  _controlador
    .consultarHabitante({ id_vivienda, id_persona })
    .then((respuestaDB) => {
      let registros = respuestaDB.rows;
      let mensaje =
        registros.length > 0 ? "Habitante consultado." : "Sin registro.";
      res.send({ ok: true, info: registros, mensaje });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Guarda una habitante
 */
//TODO: Validar la integridad de datos
router.post("/habitantes", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_habitante = req.body;

    // Valida la información, si hay un error se envia al catch
    _controlador.validarHabitante(info_habitante);

    // Guardar la habitante en base de datos
    _controlador
      .guardarHabitante(info_habitante)
      .then((respuestaDB) => {
        res.send({
          ok: true,
          mensaje: "Habitante guardado",
          info: info_habitante,
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
 * Modificar una habitante
 */
router.put("/habitantes/:id_vivienda/:id_persona", (req, res) => {
  // Capturar el parámetro de la ruta
  let id_vivienda = req.params.id_vivienda;
  let id_persona = req.params.id_persona;

  let habitante = req.body;
  _controlador
    .modificarHabitante(habitante, { id_vivienda, id_persona })
    .then((respuestaDB) => {
      res.send({
        ok: true,
        mensaje: "Habitante modificado",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Eliminar una habitante
 */
router.delete("/habitantes/:id_vivienda/:id_persona?", (req, res) => {
  let id_vivienda = req.params.id_vivienda;
  let id_persona = req.params.id_persona;

  if (id_persona) {
    _controlador
      .eliminarHabitante({ id_vivienda, id_persona })
      .then((respuestaDB) => {
        res.send({ ok: true, info: {}, mensaje: "Habitante eliminado" });
      })
      .catch((error) => {
        res.send(error);
      });
  } else {
    _controlador
      .eliminarHabitantes(id_vivienda)
      .then((respuestaDB) => {
        res.send({ ok: true, info: {}, mensaje: "Habitante eliminado" });
      })
      .catch((error) => {
        res.send(error);
      });
  }
});

module.exports = router;
