/**
 * CONTROLADOR DE HABITANTES
 *
 */

//Importar servicio de postgres
const ServicioPg = require("../services/postgres");

/**
 * Validar la información del habitante
 * @param {*} habitante Json del habitante
 */
let validarHabitante = (habitante) => {
  if (!habitante) {
    throw {
      ok: false,
      mensaje: "La información del habitante es obligatoria.",
    };
  }
  if (!habitante.id_persona) {
    throw { ok: false, mensaje: "La persona es requerida." };
  }
  if (!habitante.id_vivienda) {
    throw {
      ok: false,
      mensaje: "La vivienda del habitante es obligatoria.",
    };
  }
};

/**
 * Guardar en base de datos un habitante
 * @param {*} habitante
 */
let guardarHabitante = async (habitante) => {
  let _servicio = new ServicioPg();
  let sql = `INSERT INTO public.habitantes(
    id_vivienda, id_persona, rol)
    VALUES ($1, $2, $3);`;

  let valores = [habitante.id_vivienda, habitante.id_persona, habitante.rol];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

/**
 * Consultar habitantes
 * @param {*} filtros
 */
let consultarHabitantes = async (filtros) => {
  let _servicio = new ServicioPg();
  // { tipo_documento: 'CC' }
  let _where = "";
  let llaves = Object.keys(filtros);
  llaves.forEach((x, i) => {
    _where += `${x}='${filtros[x]}'`;
    // _where += x + "=" + filtros[x];
    if (i < llaves.length - 1) _where += " AND ";
  });
  if (_where.length > 0) {
    _where = "WHERE " + _where;
  }

  let sql = `SELECT * FROM habitantes  ${_where}`;
  console.log(sql);

  let respuesta = await _servicio.ejecutarSql(sql);
  let resultado = respuesta.rows;

  return resultado;
};

let consultarHabitante = async ({ id_vivienda, id_persona }) => {
  let _servicio = new ServicioPg();
  let sql = `select personas.*, viviendas.*, habitantes.rol from habitantes 
  inner join viviendas ON viviendas.id = habitantes.id_vivienda
  INNER join personas ON personas.documento = habitantes.id_persona	WHERE id_vivienda=$1`;
  let valores = [id_vivienda];
  if (id_persona) {
    sql += "AND id_persona=$2";
    valores.push(id_persona);
  }
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

let modificarHabitante = async (habitante, { id_vivienda, id_persona }) => {
  if (habitante.id_vivienda != id_vivienda) {
    throw {
      ok: false,
      mensaje: "El código de la vivienda no correspende al enviado.",
    };
  }
  let _servicio = new ServicioPg();
  let sql = `UPDATE public.habitantes
	SET rol=$1
	WHERE id_vivienda=$2 AND id_persona=$3`;
  let valores = [habitante.rol, habitante.id_vivienda, habitante.id_persona];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

let eliminarHabitante = async ({ id_vivienda, id_persona }) => {
  let _servicio = new ServicioPg();
  let sql = `DELETE FROM habitantes WHERE  id_vivienda=$1 AND id_persona=$2`;
  let valores = [id_vivienda, id_persona];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

let eliminarHabitantes = async (id_vivienda) => {
  let _servicio = new ServicioPg();
  let sql = `DELETE FROM habitantes WHERE  id_vivienda=$1 `;
  let valores = [id_vivienda];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

module.exports = {
  validarHabitante,
  guardarHabitante,
  consultarHabitantes,
  eliminarHabitante,
  eliminarHabitantes,
  consultarHabitante,
  modificarHabitante,
};
