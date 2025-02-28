import {hash, verify} from "argon2"
import Admin from "../admin/admin.model.js"
import { generateJWT } from "../helpers/generate-jwt.js"


export const register = async (req, res) => {
    try{
        const data = req.body
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        
        const admin = await Admin.create(data)

        return res.status(201).json({
            message: "Se ha registrado de manera exitosa el administrador",
            name: admin.name,
            email: admin.email
        })
    }catch (err) {
        return res. status(500).json({
            message: "Error al registrar el administrador",
            error: err.message 
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try{
        const admin = await Admin.findOne({
            $or:[{email: email}]
        })

        if(!admin){
            return res.status(400).json({
                message: "Credenciales inválidas o incorrectas",
                error: "No existe el usuario o el email ingresado"
            })
        }

        const validPassword = await verify(admin.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Credenciales invalidas",
                error: "La contraseña ingresada es incorrecta"
            })
        }

        const token = await generateJWT(admin.id)

        return res.status(200).json({
            message: "Inicio de sesion exitosa",
            userDetails:{
                token: token
            }
        })
        
    }catch(err) {
        return res.status(500).json({
            message: "Error al iniciar sesion",
            error: err.message
        })
    }
}