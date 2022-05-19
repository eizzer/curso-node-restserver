const Role = require('../models/role')
const Usuario = require('../models/usuario')



const esRolValido = async(rol='') =>{
    const existeRol = await Role.findOne({rol})
     if (!existeRol){
        throw new Error(`El Rol ${rol} no está en la BD`)
    } 
}
const esCorreoValido = async(correo ='') =>{
    const existeCorreo = await Usuario.findOne({correo});
        if (existeCorreo){
            throw new Error(`El Correo ${correo} ya existe en la BD`)
        }
}

const esUsuarioValido = async (id) =>{
    const existeUsuario = await Usuario.findById(id);
        if (!existeUsuario){
            throw new Error(`El ID del usuario: ${usuario} no existe`)
        }
}


module.exports={esRolValido, esCorreoValido,esUsuarioValido}