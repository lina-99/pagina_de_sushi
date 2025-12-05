const DB = require ('../config/database')

class RecetasModel {
    static async obtenerRecetas (){
        const [rows] = await DB.query('select * from sushi')
        return rows 
    }
}

module.exports = RecetasModel