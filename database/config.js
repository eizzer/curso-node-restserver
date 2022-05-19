const mongoose = require('mongoose');


const dbConection = async() =>{
try{

    await mongoose.connect(process.env.MONGODB_ATLAS);

    console.log('bd online conectada')

}catch{
    throw new Error('Error al iniciar a la base de datos')
}
}

module.exports = {dbConection}