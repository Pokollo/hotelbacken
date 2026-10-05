import mysql from "mysql2/promise"
import "dotenv/config.js"


const DB_HOST = process.env.DB_HOST
const DB_USUARIO = process.env.DB_USUARIO
const DB_NOMBRE = process.env.DB_NOMBRE
const DB_PASS = process.env.DB_PASS
const DB_PORT = process.env.DB_PORT

const conecction = mysql.createPool({
    host: DB_HOST,
    user: DB_USUARIO,
    password: DB_PASS,
    database: DB_NOMBRE,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10
})

export default conecction