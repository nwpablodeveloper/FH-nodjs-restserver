const mongoose = require('mongoose');
require('colors');


const dbConection = async () => {


    try {
        
        await mongoose.connect( process.env.MONGODB_CNN, {} );

        console.log(`DB ONLINE`.brightCyan.underline );

    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar la DB');
    }

}


module.exports = {
    dbConection
}