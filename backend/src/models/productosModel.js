const DB = require('../config/database');

class ProductosModel {
    static async obtenerProductos() {
        try {
            const [rows] = await DB.query('SELECT * FROM productos ORDER BY fecha_creacion DESC');
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener productos: ${error.message}`);
        }
    }

    static async obtenerProductoPorId(id) {
        try {
            const [rows] = await DB.query('SELECT * FROM productos WHERE producto_id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw new Error(`Error al obtener producto: ${error.message}`);
        }
    }

    static async crearProducto(datos) {
        try {
            const { nombre, descripcion, precio, categoria, stock } = datos;            
            const [resultado] = await DB.query(`
                INSERT INTO productos (nombre, descripcion, precio, categoria, stock, fecha_creacion)
                VALUES (?, ?, ?, ?, ?, NOW())
            `, [
                nombre,
                descripcion,
                precio,
                categoria,
                stock || 0
            ]);
            
            return {
                producto_id: resultado.insertId,
                ...datos,
                stock: stock || 0
            };
        } catch (error) {
            throw new Error(`Error al crear producto: ${error.message}`);
        }
    }
}

module.exports = ProductosModel;