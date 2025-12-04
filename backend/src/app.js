const express = require('express');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

const app = express();
// Usa el puerto definido en tu archivo .env o 3000 por defecto
const port = process.env.PORT || 3000;

// Middleware para procesar solicitudes JSON (necesario para la API)
app.use(express.json());

// --- RUTA DE PRUEBA ---
app.get('/', (req, res) => {
  res.send('✅ Servidor de Sushi funcionando correctamente!');
});
// -----------------------

// Iniciar el servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});