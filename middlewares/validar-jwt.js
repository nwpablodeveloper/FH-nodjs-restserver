const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async ( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETPRIVATEKEY );
        
        const usuario = await Usuario.findById( uid );

        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario logueado inexistente'
            });
        }

        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'El usuario autenticado fue baneado'
            });
        }


        req.usuario = usuario;
        
        next();

    } catch (error) {
        console.log('Error en validar-jwt 22', error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }


}

module.exports = {
    validarJWT
}