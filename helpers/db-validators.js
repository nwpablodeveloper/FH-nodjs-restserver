const Role = require('../models/role');

const { 
    Usuario,
    Categoria } = require('../models');

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

const existeCategoria =  async ( id = '' ) => {

    const existeCategoria = await Categoria.findById( id );

    if( !existeCategoria ){
        throw new Error('La categoria es inexistente')
    }
        

}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria
}