import { Router } from "express";
import conecction from "../database/connection.js";
import upload from "../config/multerConfig.js";
const routerTipoHabitacion = Router();

routerTipoHabitacion.get("/api/tipohabitacion", async(req, res)=>{
    try {
        const [rows] = await conecction.query("SELECT * FROM tipos_habitacion");
        return res.status(200).json({
            success:true,
            message: "tipos de habitacion encontradas",
            data: rows
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        })
    }
})

routerTipoHabitacion.post("/api/tipohabitacion", upload.single("imagen"), async(req, res)=>{

    const{nombre, capacidad_maxima, precio_noche, descripcion} = req.body;
    const imagen = req.file ?  `${req.file.filename}` : null
    
    try {
            await conecction.query("INSERT INTO tipos_habitacion(nombre, capacidad_maxima, precio_noche, descripcion, imagen) VALUES (?, ?, ?, ?, ?)",
            [nombre, capacidad_maxima, precio_noche, descripcion, imagen]
        )
        return res.status(201).json({
            success:true,
            message: "Habitacion creada",
            data: req.body
        })
    } catch (error) {
        console.log(error)
    }

})

export default routerTipoHabitacion;