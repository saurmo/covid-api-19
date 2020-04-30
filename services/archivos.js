const fs = require("fs");
const Handlebars = require("handlebars");
class ServicioArchivos {
  guardarArchivo(ruta, data) {
    fs.writeFileSync(ruta, data);
  }

  leerArchivo(ruta) {
    return fs.readFileSync(ruta);
  }

  renderizarPlantilla(plantilla, info) {
    const template = Handlebars.compile(plantilla);
    return template(info);
  }

  crearCarpeta() {
    fs.mkdirSync();
  }
}

module.exports = ServicioArchivos;
