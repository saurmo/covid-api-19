//Importar servicio de postgres
const ServicioPg = require("../services/postgres");

// Importar jwt
const jwt = require("jsonwebtoken");
const SECRET_KEY =
  "68ce89b6fd30da346cecc7812eb66b121623d4971cffeaf528c6a691e4d5e4593b711138c3717e6cbbf5b4a93a2f79097c5eef39a9e2aca2621f19b4b5255dc1";
/**
 * Realizar autenticación de persona en el sistema
 * @param {*} persona Json de la persona
 */
let validarLogin = (persona) => {
  if (!persona) {
    throw {
      ok: false,
      mensaje: "La información de la persona es obligatoria.",
    };
  }

  if (!persona.documento) {
    throw { ok: false, mensaje: "El documento de la persona es obligatorio." };
  }
  if (!persona.clave) {
    throw { ok: false, mensaje: "La clave de la persona es obligatoria." };
  }
};

/**
 * Consultar la persona en el sistema con documento y clave
 * @param {*} persona
 */
let consultarPersona = async (persona) => {
  let _servicio = new ServicioPg();
  let sql = `SELECT * FROM personas WHERE documento=$1 AND clave=md5($2)`;
  let valores = [persona.documento, persona.clave];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

let generarToken = (persona) => {
  delete persona.clave;
  let token = jwt.sign(persona, SECRET_KEY, { expiresIn: "1h" });
  return token;
};

let verificarToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = {
  validarLogin,
  consultarPersona,
  generarToken,
  verificarToken,
};
