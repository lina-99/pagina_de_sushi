// app.js - Servidor principal de la aplicación

// Importamos las dependencias necesarias
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importamos las rutas
const productosRoutes = require('./routers/productosRoutes');

// Creamos la aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permitir peticiones desde otros orígenes
app.use(express.json()); // Parsear JSON en el body de las peticiones
app.use(express.urlencoded({ extended: true })); // Parsear datos de formularios

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API de Productos funcionando correctamente'
    });
});

// Rutas de la API
app.use('/api', productosRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint no encontrado'
    });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
    console.log(`API disponible en: http://localhost:${port}/api`);;
});

module.exports = app;