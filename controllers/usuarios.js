const { response } = require('express')

const usuariosGet = (req, res = response ) => {

    console.log(req);
    const { q, nombre = 'no name', limit = 1, page = 1 } = req.query;

    res.json({
        q,
        nombre,
        limit,
        page
    });
}

const usuariosPost = (req, res = response ) => {

    const { nombre, edad } = req.body;

    res.json({
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response ) => {

    res.json({
        nombre: 'Get API'
    });
}

const usuariosPath = (req, res = response ) => {
    res.json({
        nombre: 'Patch API'
    });
}

const usuariosDelete = (req, res = response ) => {
    res.json({
        nombre: 'Delete API'
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPath,
    usuariosPut,
    usuariosDelete
}