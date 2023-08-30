const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '' ) => {
    
    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {
            if ( err ) {
                console.log(err);
                reject('Error al crear el Token')
            } else {
                resolve( token )
            }
        });

    });

}

module.exports = {
    generarJWT
}