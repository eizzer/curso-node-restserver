const { query } = require('express');
const {response}= require ('express')
const Usuario =  require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet= async (req,res = response)=>{


    const {limite=5, desde=5} = req.query;
    const query = {estado:true};

/*   const usuarios = await Usuario.find(query)
  .skip(Number(desde))
  .limit(Number(limite));

  const total = await Usuario.countDocuments(query); */

  // Promise ALL  hace que si una da error todas dan error, a su vez, se ejecutan simultaneamente optimizando código
    const [totales, usuarios]= await Promise.all([Usuario.countDocuments(query),Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))])

    res.json({
        //resp
         totales,
      usuarios 
    })
}

const usuariosPut= async (req,res = response)=>{

    const {id} = req.params;
    const {_id,password,google, correo, ... resto} = req.body;

    //TODO Validar contra BD
    if(password){
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password,10)
    }

    const usuariodb= await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        msg: 'put API - controlador',
        usuariodb
    })
}

const usuariosPost= async (req,res = response)=>{

    // aqui recibo el JSON de Postman
    const {nombre,correo,password,rol} = req.body;

    // Aqui creo al usuario del Schema en Model
    const usuario = new Usuario({nombre,correo,password,rol});

    //Verificar si el correo existe
/*     const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        return res.status(400).json({
            msg: 'Correo ya existe'
        })
    } */
    //Encriptar la contraseña

    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password,10)

    //Guardar en MongoDB
    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario
    })
}

const usuariosDelete= async (req,res = response)=>{

    const {id}=req.params

    //Fisicamente borrar

    //const usuario= await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})
    res.json({
        usuario
    })
}
//

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}