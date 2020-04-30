const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/personas");

/**
 * Obtener todas las personas
 */
router.get("/personas", (req, res) => {
  let filtros = req.query;
  _controlador
    .consultarPersonas(filtros)
    .then((respuestaDB) => {
      let registros = respuestaDB;
      res.send({ ok: true, info: registros, mensaje: "Personas consultadas" });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Consultar una personas por documento
 */
router.get("/personas/:id", (req, res) => {
  let id = req.params.id;
  _controlador
    .consultarPersona(id)
    .then((respuestaDB) => {
      let registros = respuestaDB.rows;
      let mensaje =
        registros.length > 0 ? "Persona consultada." : "Sin registro.";
      res.send({ ok: true, info: registros, mensaje });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Guarda una persona
 */
router.post("/personas", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_persona = req.body;

    // Valida la información, si hay un error se envia al catch
    _controlador.validarPersona(info_persona);

    // Guardar la persona en base de datos
    _controlador
      .guardarPersona(info_persona)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "Persona guardada", info: info_persona });
      })
      .catch((error) => {
        res.send(error);
      });

    // Responder
  } catch (error) {
    res.send(error);
  }
});

router.post("/personas/imagenes", (req, res) => {
  try {
    let archivo = req.files.archivo;
    console.log(archivo);
    archivo.mv("archivos/" + archivo.name).then((res) => {
      console.log("archivo guardado");
    });
    res.send({ ok: true, mensaje: "Persona ha subido una imagen." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, mensaje: "Error al subir una imagen" });
  }
});

/**
 * Modificar una persona
 */
router.put("/personas/:id", (req, res) => {
  // Capturar el parámetro de la ruta
  let id = req.params.id;

  let persona = req.body;
  _controlador
    .modificarPersona(persona, id)
    .then((respuestaDB) => {
      res.send({ ok: true, mensaje: "Persona modificada", info: persona });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Eliminar una persona
 */
router.delete("/personas/:id", (req, res) => {
  let id = req.params.id;
  _controlador
    .eliminarPersona(id)
    .then((respuestaDB) => {
      res.send({ ok: true, info: {}, mensaje: "Persona eliminada" });
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
