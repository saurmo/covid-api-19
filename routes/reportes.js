const express = require("express");
const router = express.Router();

const { PassThrough } = require("stream");
const { crearPDF } = require("../services/pdf/jsreport");
router.get("/pdf/holamundo", async (req, res) => {
  try {
    res.set("Content-disposition", "attachment; filename=reporte.pdf");

    let info = {
      nombre: "Santiago",
      people: ["Yehuda Katz", "Alan Johnson", "Charles Jolley"],
    };
    let bufferPDF = await crearPDF(info, "reportePruebas");

    let stream = new PassThrough();
    stream.end(bufferPDF);
    stream.pipe(res);
    // return res.send("OK");
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
