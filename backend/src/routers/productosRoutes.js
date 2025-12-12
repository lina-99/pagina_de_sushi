const express = require('express');
const router = express.Router();
const ProductosController = require('../controllers/ProductosController');

// Existing product routes
router.get('/productos', ProductosController.obtenerProductos);
router.get('/productos/:id', ProductosController.obtenerProductoPorId);
router.post('/productos', ProductosController.crearProducto);

// New recipes route for frontend compatibility
router.get('/recipes', ProductosController.obtenerProductos);

module.exports = router;
