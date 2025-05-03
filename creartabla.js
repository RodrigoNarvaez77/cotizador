const pool = require("./db/db"); // Suponiendo que guardaste el código anterior en db.js

async function crearTabla() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cotizaciones (
        id SERIAL PRIMARY KEY,
        rut TEXT,
        nombre TEXT,
        comuna TEXT,
        email TEXT,
        telefono TEXT,
        mensaje TEXT,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Tabla creada");
  } catch (err) {
    console.error("❌ Error al crear tabla:", err);
  } finally {
    pool.end();
  }
}

crearTabla();
