const mysql = require ('mysql2')
require ('dotenv'). config ()

const pool = mysql.createPool(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        paswword: process.env.DB_PASSWORD,
        database:process.env.DB_NAME,
        connectionLimit: 10,
    }
)
const conectionPromise = pool.promise()
module.exports = conectionPromise