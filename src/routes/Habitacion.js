import { Router } from "express";
import conecction from "../database/connection.js";
import upload from "../config/multerConfig.js";

const routerHabitacion = Router()

routerHabitacion.get("/api/habitacion/:id_tipo", async(req, res)=>{

    const {id_tipo} = req.params

    try {
        const [rows] = await conecction.query("SELECT * FROM habitaciones WHERE id_tipo = ?", [id_tipo])
        return res.status(200).json({
            success: true,
            message: "HABITACIONES ENCONTRADAS",
            data: rows
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "INTERNAL SERVER ERROR"
        });
    }
})

routerHabitacion.get("/api/habitacion", async(req, res)=>{

    try {
        const [rows] = await conecction.query("SELECT * FROM habitaciones")
        return res.status(200).json({
            success: true,
            message: "HABITACIONES ENCONTRADAS",
            data: rows
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "INTERNAL SERVER ERROR"
        });
    }
})

routerHabitacion.post("/api/habitacion", upload.single("imagen"), async(req, res)=>{
    const {numero_habitacion, id_tipo} = req.body
    const imagen = req.file ?  `/${req.file.filename}` : null
    
    try {
        const [result] = await conecction.query("INSERT INTO habitaciones(numero_habitacion, id_tipo, imagen) VALUES(?,?,?)",
            [numero_habitacion, id_tipo, imagen]
        )
        return res.status(201).json({
            success: true,
            message: "habitacion ceada",
            data: {numero_habitacion, id_tipo,imagen}
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "INTERNAL SERVER ERROR"
        });
    }


})

export default routerHabitacion