require("../server/keys");

const ServicioArchivos = require("../services/archivos");
let _archivos = new ServicioArchivos();

const ServicioCorreo = require("../services/nodemailer");
const _correo = new ServicioCorreo();

let plantilla = _archivos
  .leerArchivo("templates/correoBienvenida.html")
  .toString();

plantilla = _archivos.renderizarPlantilla(plantilla, {
  nombre_persona: "Estudiantes v2",
});

plantilla = plantilla.replace("node_nombre_usuario", "Estudiantes ");
console.log(plantilla);

let destinatarios = [
  "saurmo0108@gmail.com",
  "jhonstevenkill22@gmail.com",
  "Alejandra_alvfer12@hotmail.com",
  "juanjosearroyave0401@gmail.com",
  "alejandrabedoya00@gmail.com",
  "inmortal_20@live.com",
  "estivencano99@gmail.com",
  "sebasdiez84@gmail.com",
  "juanjosegomez1908@gmail.com",
  "kevinrock1920@hotmail.com",
  "mariafernandahenaoherrera@gmail.com",
  "nata_6816@hotmail.com",
  "kevin11062011@gmail.com",
  "jdmowp10@gmail.com",
  "diegojuan2104@gmail.com",
  "camilop.rivas@gmail.com",
  "Alejandrosuaza.1022@gmail.com",
  "bryk347@gmail.com",
  "carloszzzxc@hotmail.com",
  "jheyson.v.m1@gmail.com",
];
// _correo
//   .enviarCorreo(plantilla, destinatarios)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
