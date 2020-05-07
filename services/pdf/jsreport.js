const JSReport = require("jsreport-core")();
const fs = require("fs");

const crearPlantilla = (nombrePlantilla) => {
  let html = fs.readFileSync(`./templates/${nombrePlantilla}.html`).toString();

  let plantilla = {};
  plantilla.content = html;
  plantilla.recipe = "chrome-pdf";
  plantilla.engine = "handlebars";
  return plantilla;
};

const crearPDF = async (data, nombrePlantilla) => {
  // Inicializar el JSReport
  await JSReport.init();

  let infoPdf = {};
  infoPdf.template = crearPlantilla(nombrePlantilla);
  infoPdf.data = data;

  let resultado = await JSReport.render(infoPdf);
  return resultado.content;
};

module.exports = { crearPDF };

// crearPDF()
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
