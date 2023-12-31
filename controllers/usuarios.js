const { response } = require('express')
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req, res = response ) => {
    
    const { desde = 0, limit } = req.query;
    const query = { estado: true }

/* 
    const documentos = await Usuario.countDocuments( query );

    const usuarios = await Usuario.find( query )
                                    .skip( desde )
                                    .limit( limit )
 */
    
    // ejecutar todas las promesas de forma simultanea
    const [ documentos, usuarios ] = await Promise.all([

        Usuario.countDocuments( query ),

        Usuario.find( query )
                .skip( desde )
                .limit( limit ),
                
    ]);
    

    res.json({
        documentos,
        usuarios
    });
}

const usuariosPost = async (req, res = response ) => {

    
    const { nombre, correo, password, rol } = req.body;
    
    const usuario = new Usuario({ 
        nombre, 
        correo, 
        password,
        rol
    });                    

    const salt = bcrypt.genSaltSync(7);
    usuario.password = bcrypt.hashSync( password, salt );
    
    await usuario.save();

    res.json({
        usuario
    });

}

const usuariosPut = async (req, res = response ) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    // TODO validar contra DB

    if( password ) {
        const salt = bcrypt.genSaltSync(7);
        resto.password = bcrypt.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.json({ usuario });
}


const usuariosDelete = async ( req, res ) => {

    const { id } = req.params;


    // Borrar fisicamente
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json({
        usuario
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}