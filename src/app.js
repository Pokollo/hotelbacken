import express from "express"
import routerTipoHabitacion from "./routes/tipoHabitacion.js"
import routerUsuario from "./routes/Usuario.js"
import routerHabitacion from "./routes/Habitacion.js"
import routerReserva from "./routes/Reserva.js"
import cors from "cors"
 
const app = express()

const URL = process.env.URL

app.use(cors({
    origin:"http://localhost:5173"
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(routerTipoHabitacion)
app.use(routerUsuario)
app.use(routerHabitacion)
app.use(routerReserva)


app.listen(3000, ()=>{
    console.log("APLICACION LEVANTADA EN:", URL)
})
