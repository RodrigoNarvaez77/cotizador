const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 Conexión a PostgreSQL usando variables del archivo .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Importante para Render
  },
});

app.post("/guardar-cotizacion", async (req, res) => {
  try {
    const { rut, nombre, comuna, email, telefono, mensaje } = req.body;

    const query = `
      INSERT INTO cotizaciones (rut, nombre, comuna, email, telefono, mensaje)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, fecha;
    `;

    const values = [rut, nombre, comuna, email, telefono, mensaje];
    const result = await pool.query(query, values);

    console.log("✅ Cotización guardada con ID:", result.rows[0].id);
    res.send("Cotización guardada correctamente.");
  } catch (err) {
    console.error("❌ Error al guardar en PostgreSQL:", err);
    res.status(500).send("Error al guardar la cotización.");
  }
});

app.get("/cotizaciones", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM cotizaciones ORDER BY fecha DESC"
    );

    console.log("📋 Cotizaciones registradas:");
    console.log(result.rows); // Esto las imprime en consola

    res.json(result.rows); // Y las devuelve como JSON al frontend o Postman
  } catch (err) {
    console.error("❌ Error al consultar cotizaciones:", err);
    res.status(500).send("Error al obtener las cotizaciones.");
  }
});

// 🔁 Puerto dinámico para Render
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
