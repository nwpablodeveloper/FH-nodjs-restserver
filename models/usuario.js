const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario' ],
    },
    correo: {
        type: String,
        required: [ true, 'El correo es necesario' ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'El correo es necesario' ],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean
    }

});

// ver video 132 Centralizar la validación del ROL
UsuarioSchema.methods.toJSON = function () {
    const { _id, __v, password, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'usuario', UsuarioSchema );