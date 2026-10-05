import { Router } from "express";
import conecction from "../database/connection.js";


const routerReserva = Router()

routerReserva.get("/api/reserva", async(req, res)=>{

    try {
        const [rows] = await conecction.query("SELECT * FROM reservas")

        return res.status(200).json({
            success: true,
            message: "Reservas",
            data: rows            
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "INNTERNAL SERVER ERROR"
        })
    }
})

routerReserva.get("/api/reserva/usuario/:id", async(req, res)=>{
    
    const {id} = req.params
    try {
        const [rows] = await conecction.query("SELECT * FROM reservas WHERE id_usuario = ?", [id])
        
        return res.status(200).json({
            success: true,
            message: "Reservas",
            data: rows            
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "INNTERNAL SERVER ERROR"
        })
    }
})

routerReserva.post("/api/reserva", async(req, res)=>{
    
    const {id_usuario, id_habitacion, fecha_checkin, fecha_checkout} = req.body

    const [rows] = await conecction.query("SELECT h.numero_habitacion, th.precio_noche FROM habitaciones h INNER JOIN tipos_habitacion th ON h.id_tipo = th.id_tipo WHERE h.id_habitacion = ?", [id_habitacion])
    const precio_noche = parseFloat(rows[0].precio_noche)
    const numero_habitacion = rows[0].numero_habitacion
    const checkin = new Date(fecha_checkin)
    const checkout = new Date(fecha_checkout)
    

    const milisegundos = 1000 * 60 *60 *24;

    const dias = Math.round((checkout-checkin)/milisegundos)

    const precio_total = precio_noche *dias;
    try {
        
        const [result] = await conecction.query("INSERT INTO reservas(id_usuario, id_habitacion, fecha_checkin, fecha_checkout, precio_total) VALUES (?,?,?,?,?)",
            [id_usuario, id_habitacion, fecha_checkin, fecha_checkout, precio_total]
        )
        return res.status(200).json({
            success: true,
            message: "Reserva creada con exito",
            data: {numero_habitacion, fecha_checkin, fecha_checkout, precio_total}
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "INNTERNAL SERVER ERROR"
        })
    }

})

export default routerReserva