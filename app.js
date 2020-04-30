// require("./server/keys");

// Importar express
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
// Inicializar la librería
const app = express();
app.use(express.json());
app.use(fileUpload());

app.use(cors());
// Endpoint
/**
 * URI's  disponibles en el API
 */

app.get("/", (req, res) => {
  res.send("Bienvenido a la API para familias del covid-19");
});

// VERSION del api
const vs = "/api/v1/";

//
/**
 * IMPORTAR RUTAS DE LOS ROUTERS
 */

/**
 * RECURSOS PUBLICOS
 */

/**
 * RECURSOS PRIVADOS: Necesitan un token generado con la autorización.
 */
const rutas_autenticacion = require("./routes/autenticacion");
app.use(vs, rutas_autenticacion);

const rutas_personas = require("./routes/personas");
app.use(vs, rutas_personas);

const rutas_viviendas = require("./routes/viviendas");
app.use(vs, rutas_viviendas);

const rutas_habitantes = require("./routes/habitantes");
app.use(vs, rutas_habitantes);

app.use("/", (req, res) => {
  res.status(404).send({
    ok: false,
    mensaje: "El recurso que busca no existe.",
  });
});

// Puerto
const port = process.env.PORT || 3000;
// Levantar el servidor para escuchar los puertos
app.listen(port, () => {
  console.log(
    `Escuchando API en http://localhost:${port} en el modo ${process.env.MODE}`
  );
});
