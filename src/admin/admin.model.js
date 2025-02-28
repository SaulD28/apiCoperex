import {Schema, model} from "mongoose"

const adminSchema = Schema({
    name:{
        type:String,
        required: [true, "El nombre del usuario es obligatorio"],
        maxLength: [25, "El nombre no puede pasar de los 25 caracteres"]
    },
    email:{
        type: String,
        required: [true, "Se requiere el email del usuario"],
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true  
    },
    password:{
        type: String,
        required: [true, "Se requiere una contraseña"]
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE"],
        default: "ADMIN_ROLE"
    }
},    
{
    versionKey: false,
    timesstamps: true

})

export default model("Admin", adminSchema)