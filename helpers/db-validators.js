const Role = require('../models/role');
const Usuario = require('../models/usuario')

const esRoleValido = async (rol = '' ) => {

    const existeRol = await Role.findOne({ rol });
    if( !existeRol ) {
        throw new Error(`El rol: ${ rol } no existe en la DB`)
    }

}

const emailExiste = async ( correo = '' ) => {
    
    const existeEmail = await Usuario.findOne({ correo });

    if ( existeEmail ) {
        throw new Error(`El email: ${ correo } ya esta en uso`);
    }

}

const existeUsuarioPorId = async ( id = '' ) => {

    const existeUsuario = await Usuario.findById(id);

    if ( !existeUsuario ) {
        throw new Error('Usuario Inexistente');
    }


}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}