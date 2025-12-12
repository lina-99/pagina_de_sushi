const ProductosModel = require('../models/ProductosModel');

class ProductosController {
    static async obtenerProductos(req, res) {
        try {
            const productos = await ProductosModel.obtenerProductos();
            res.json({
                success: true,
                data: productos
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async obtenerRecipes(req, res) {
        try {
            const productos = await ProductosModel.obtenerProductos();
            // Map productos to recipes format expected by frontend
            const recipes = productos.map(producto => ({
                id: producto.producto_id,
                name: producto.nombre,
                description: producto.descripcion,
                price: producto.precio,
                imageUrl: `https://placehold.co/400x200/cccccc/000000?text=${encodeURIComponent(producto.nombre)}`,
                ingredients: [producto.categoria] // Using categoria as ingredients for now
            }));
            res.json(recipes);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async obtenerProductoPorId(req, res) {
        try {
            const { id } = req.params;
            const producto = await ProductosModel.obtenerProductoPorId(id);
            if (!producto) {
                return res.status(404).json({
                    success: false,
                    message: 'Producto no encontrado'
                });
            }
            res.json({
                success: true,
                data: producto
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async crearProducto(req, res) {
        try {
            const producto = await ProductosModel.crearProducto(req.body);
            res.status(201).json({
                success: true,
                data: producto
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = ProductosController;
