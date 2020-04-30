/**
 * CONTROLADOR DE VIVIENDAS
 *
 */

//Importar servicio de postgres
const ServicioPg = require("../services/postgres");

/**
 * Validar la información de la vivienda
 * @param {*} vivienda Json de la vivienda
 */
let validarVivienda = (vivienda) => {
  if (!vivienda) {
    throw {
      ok: false,
      mensaje: "La información de la vivienda es obligatoria.",
    };
  }
  if (!vivienda.telefono) {
    throw { ok: false, mensaje: "El teléfono de la vivienda es obligatorio." };
  }
  if (!vivienda.nro_personas) {
    throw {
      ok: false,
      mensaje: "El número de personas de la vivienda es obligatorio.",
    };
  }
};

/**
 * Guardar en base de datos una vivienda
 * @param {*} vivienda
 */
let guardarVivienda = async (vivienda) => {
  let _servicio = new ServicioPg();
  let sql = `   INSERT INTO public.viviendas(
	 barrio, direccion, municipio, departamento, estrato, telefono, nro_personas, descripcion)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;

  let valores = [
    vivienda.barrio,
    vivienda.direccion,
    vivienda.municipio,
    vivienda.departamento,
    vivienda.estrato,
    vivienda.telefono,
    vivienda.nro_personas,
    vivienda.descripcion,
  ];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

/**
 * Consultar personas
 * @param {*} filtros
 */
let consultarViviendas = async (filtros) => {
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

  let sql = `SELECT * FROM viviendas  ${_where}`;
  console.log(sql);

  let respuesta = await _servicio.ejecutarSql(sql);
  let resultado = respuesta.rows;

  return resultado;
};

let consultarVivienda = async (id) => {
  let _servicio = new ServicioPg();
  let sql = `SELECT * FROM viviendas WHERE id=$1`;
  let respuesta = await _servicio.ejecutarSql(sql, [id]);
  return respuesta;
};

let modificarVivienda = async (vivienda, id) => {
  if (vivienda.id != id) {
    throw {
      ok: false,
      mensaje: "El código de la vivienda no correspende al enviado.",
    };
  }
  let _servicio = new ServicioPg();
  let sql = `UPDATE public.viviendas
  SET  barrio=$1, direccion=$2, municipio=$3, departamento=$4, estrato=$5, telefono=$6, nro_personas=$7, descripcion=$8
  WHERE id=$9`;
  let valores = [
    vivienda.barrio,
    vivienda.direccion,
    vivienda.municipio,
    vivienda.departamento,
    vivienda.estrato,
    vivienda.telefono,
    vivienda.nro_personas,
    vivienda.descripcion,
    vivienda.id,
  ];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

let eliminarVivienda = async (id) => {
  let _servicio = new ServicioPg();
  let sql = `DELETE FROM viviendas WHERE id=$1`;
  let valores = [id];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

module.exports = {
  validarVivienda,
  guardarVivienda,
  consultarViviendas,
  eliminarVivienda,
  consultarVivienda,
  modificarVivienda,
};
