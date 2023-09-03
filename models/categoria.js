const { Schema, model } = require('mongoose');


const CategoriaSchema = new Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es requerido' ],
        unique: true
    },
    estado: {
        type: String,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

CategoriaSchema.methods.toJSON = function() {
    const { __v, ...categoria } = this.toObject();
    return categoria
}


module.exports = model( 'Categoria', CategoriaSchema );