const { json } = require('express')
const Model = require ('../models/recetamodel')

class RecetaControl{
    static async obtenerRecetas(request, response){
    const recetas = await Model.obtenerRecetas()
    response.json({
        succesess: true,
        data: recetas

    })
    }
}