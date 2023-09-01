const { request, response } = require("express");
const bcryptjs = require('bcryptjs');
const { googleVerify } = require("../helpers/google-verify");
// const jwt = require('jsonwebtoken');

const { generarJWT } = require("../helpers/generarJWT");
const Usuario = require('../models/usuario');


const login = async ( req = request, res = response ) => {
    
    const { correo, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne( { correo } )

        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario o contraseña no valido'
            });
        }

        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario baneado'
            });
        }

        const validarPassword = bcryptjs.compareSync( password, usuario.password )
        
        if( !validarPassword ) {
            return res.status(400).json({
                msg: 'Credenciales no validas'
            })
        }

        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });

    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            msg: 'Error en el backend al hacer login'
        });
    }

}

const googleSignIn = async ( req = request, res = response ) => {

    const { id_token } =  req.body;

    try {

        const { correo, img, nombre } = await googleVerify( id_token );

        let usuario = await Usuario.findOne( { correo } );

        if ( !usuario ) {
            const data = {
                nombre,
                correo,
                img,
                google: true,
                rol: 'USER_ROLE',
                password: ':P',
            }
            
            usuario = new Usuario( data );
            await usuario.save();
        }

        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Usuario baneado, hable con el admin'
            });
        }

        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });


    } catch (error) {

        console.log(error);

        res.status(400).json({
            msg: 'Error de Google Token'
        })
    }


}


module.exports = {
    login,
    googleSignIn
}