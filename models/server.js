const express = require ('express');
const cors = require('cors');
require('dotenv').config();

class Server{

    // constructor del servidor
constructor(){
    this.app = express();
    this.port=process.env.PORT;
    this.usuariosPath = '/api/usuarios';
    //Middlewares
    this.middlewares();
    //Rutas de la aplicacion
    this.routes();
}

middlewares(){

    //CORS 
    this.app.use(cors());

    //Parseo y lectura del body

    this.app.use(express.json());

    //Directorio público
    this.app.use(express.static('public'));
}



routes(){
this.app.use(this.usuariosPath,require('../routes/usuarios'));
}

listen(){
    this.app.listen(this.port, ()=>{
        console.log('Puerto escuchando:', this.port)
    });
}

}

module.exports = Server