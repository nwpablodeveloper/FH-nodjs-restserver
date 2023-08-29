const { Schema, model } = require('mongoose');

const RoleSchema = new Schema({

    role: {
        type: String,
        required: [ true, 'El Rol es obligatorio' ]
    }

});


module.exports = model( 'role', RoleSchema ); 