const { request, response } = require("express")


const esAdminRole = ( req = request, res = response, next ) => {


    if( !req.usuario ){
        return res.status(500).json({
            msg: 'Primero se requiere verificar el usuario antes de verificar el Role'
        });
    }

    const { rol, nombre } = req.usuario;
    
    if( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: 'No tienes permisos para eliminar usuarios'
        });
    }

    next();

}

const tieneRole = ( ...roles ) => {

    
    return ( req, res = response, next ) => {

        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Primero se requiere verificar el usuario antes de verificar el Role'
            });
        }

        if ( !roles.includes( req.usuario.rol )) {
            return res.status(401).json({
                msg: 'No tienes permisos para eliminar usuario'
            });
        }

        next();

    }

}

module.exports = {
    esAdminRole,
    tieneRole
}