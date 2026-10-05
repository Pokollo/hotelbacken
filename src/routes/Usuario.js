import connection from "../database/connection.js"
import { Router } from "express"
import bcryptjs from "bcryptjs"
const routerUsuario= Router()

routerUsuario.get("/api/usuario", async(req, res)=>{

    try {
        const [rows] = await connection.query("SELECT * FROM usuarios")
        return res.status(200).json({
            success:true,
            message: "Usuarios encontrados",
            data: rows
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "INTERNAL SERVER ERROR",
            data: rows
        })
    }

})

routerUsuario.get("/api/usuario/:id", async(req, res)=>{

    const {id}= req.params

    if (!id || isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "ID inválido"
        });
    }

    try {
        const [rows] = await connection.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id])
        if(rows.length === 0){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Usuario encontrado",
            data: rows[0]
        });

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "INTERNAR SERVER ERROR"
        });
    }

})

routerUsuario.post("/api/usuario/registrar", async(req, res)=>{
    
    const {nombre_completo, email, password_hash, telefono} = req.body

    try {
        
        let passwordHash = await bcryptjs.hash(password_hash, 8)

        const [result] = await connection.query("INSERT INTO usuarios(nombre_completo, email, password_hash, telefono) VALUES(?,?,?,?)",
            [nombre_completo, email, passwordHash, telefono]
        )
        return res.status(201).json({
            success: true,
            message: "Usuario Creado",
            data: {nombre_completo, email, telefono}
        });

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "INTERNAL SERVER ERROR"
        });
    }

})

routerUsuario.post("/api/usuario/login", async(req,res)=>{
    const {email, pass} = req.body
    if(email === undefined || pass === undefined){
        return res.status(400).json({
            success: false,
            message: "Bad Request LOLA"
        })
    }
    try {
        
        const [response] = await connection.query("SELECT * FROM usuarios WHERE email = ?", [email])
        if(response.length === 0 || !(await bcryptjs.compare(pass, response[0].password_hash))){
            return res.status(400).json({
                success:false,
                message:"Usuario o Contraseña incorrectos"
            })
        }else{
            return res.status(200).json({
                success: true,
                message:"INICIO DE SESION EXITOSO",
                data: {id:response[0].id_usuario, nombre: response[0].nombre_completo, email: response[0].email}
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message:"INTERNAL SERVER ERROR 5"
        })
    }
    
})

export default routerUsuario