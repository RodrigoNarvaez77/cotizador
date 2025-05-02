const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/guardar-cotizacion", (req, res) => {
  const { rut, nombre, comuna, email, telefono, mensaje } = req.body;

  const fecha = new Date().toLocaleString();

  const registro = `
-------------------------------
Fecha: ${fecha}
RUT: ${rut}
Nombre: ${nombre}
Comuna: ${comuna}
Correo Electrónico: ${email}
Teléfono: ${telefono}
Mensaje: ${mensaje}
-------------------------------\n`;

  fs.appendFile("cotizaciones.txt", registro, (err) => {
    if (err) {
      console.error("❌ Error al guardar:", err);
      return res.status(500).send("Error al guardar");
    }
    console.log("✅ Cotización guardada");
    res.send("Cotización guardada correctamente");
  });
});

// ✅ Puerto dinámico para Render o 3001 en local
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
