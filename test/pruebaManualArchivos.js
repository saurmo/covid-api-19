const ServicioArchivos = require("../services/archivos");
let _archivos = new ServicioArchivos();

// _archivos.guardarArchivo();

let prueba = _archivos.leerArchivo();
console.log(prueba.toString());
