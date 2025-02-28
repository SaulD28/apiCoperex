import Admin from "../admin/admin.model.js"

export const emailExists = async (email = "") => {
    const exist = await Admin.findOne(({email}))
    if(exist){
        throw new Error(`The email ${email} is al ready registered`)
    }
}

export const adminExists = async (uid = "") => {
    const exist = await Admin.findById(uid)
    if(!exist){
        throw new Error("No existe usurio con el siguiente ID")
    }
}