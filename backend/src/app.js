//const express = require('express')
//const app = express()
//const port = 3000

//app.get('/', (req, res) => {
 // res.send('Funciona')
//})

//app.listen(port, () => {
  //console.log(`Servidor corriendo ${port}`)
//})

// api.js
// 
// Importamos Express para crear el servidor
const express = require('express');
const cors = require('cors'); // Necesario para permitir que el frontend acceda a la API

const app = express();
const port = 3000;

// Configuración de CORS
// Esto permite que el navegador cargue recursos desde el puerto 3000
// incluso si el archivo HTML se abre directamente (protocolo file://) o desde otro puerto.
app.use(cors());

// --- Datos Simulados de la Base de Datos ---
// En una aplicación real, esta información vendría de un modelo de base de datos
const recipes = [
    {
        id: 1,
        name: "California Roll Clásico",
        description: "Un rollo de sushi muy popular con aguacate, pepino, surimi y semillas de sésamo.",
        price: 8.50,
        ingredients: ["Arroz de sushi", "Alga nori", "Surimi", "Aguacate", "Pepino", "Semillas de sésamo"],
        imageUrl: "https://placehold.co/400x200/5cb85c/white?text=CALIFORNIA+ROLL"
    },
    {
        id: 2,
        name: "Nigiri de Salmón",
        description: "Finas láminas de salmón fresco sobre una porción de arroz avinagrado.",
        price: 12.00,
        ingredients: ["Arroz de sushi", "Salmón fresco"],
        imageUrl: "https://placehold.co/400x200/0275d8/white?text=NIGIRI+SALMON"
    },
    {
        id: 3,
        name: "Maki de Atún Picante",
        description: "Rollo con atún picado y mezclado con salsa Sriracha, ideal para amantes del picante.",
        price: 9.90,
        ingredients: ["Arroz de sushi", "Alga nori", "Atún", "Salsa Sriracha", "Mayonesa"],
        imageUrl: "https://placehold.co/400x200/f0ad4e/white?text=SPICY+TUNA+MAKI"
    }
];
// ------------------------------------------

// Endpoint para obtener todas las recetas (registros)
app.get('/api/recipes', (req, res) => {
    console.log('Solicitud recibida en /api/recipes. Enviando 3 registros.');
    res.status(200).json(recipes); // Enviamos el array de recetas en formato JSON
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('El servidor está funcionando. Usa /api/recipes para obtener los datos.');
});

// Iniciamos el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
    console.log(`Endpoint de datos: http://localhost:${port}/api/recipes`);
});

// Instrucciones para el usuario:
// 1. Asegúrate de tener Node.js instalado.
// 2. Instala Express y CORS: npm install express cors
// 3. Ejecuta el servidor: node api.js
