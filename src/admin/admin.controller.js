`user strict`

import { hash } from "argon2"
import Admin from "./admin.model.js"

export const createAdmin = async () => {
    const createAdmin = {
        "name": "Edison",
        "email": "edidonis42@gmail.com",
        "username": "SDonis28",
        "password": "HDoni$3jr",
        "role": "ADMIN_ROLE"
    }

    const admin = await Admin.findOne({email: createAdmin.email})
    if(!admin){
        createAdmin.password = await hash(createAdmin.password)
        await Admin.create(createAdmin)
        console.log(`Admin creado email: ${createAdmin.email}, Contraseña: HDoni$3jr`)
    }
}