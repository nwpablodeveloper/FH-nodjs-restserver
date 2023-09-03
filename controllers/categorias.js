// const Categoria = require("../models/categoria");
const { Categoria } = require('../models')

const obtenerCategorias = async ( req, res ) => {

    const { limite = 5, desde = 0 } = req.query;
    const [ total, categorias ] = await Promise.all([

        Categoria.countDocuments( { estado: true } ),
        Categoria.find()
            .populate('usuario', 'correo')
            .skip( Number(desde) )
            .limit( Number( limite ) )

    ])

    res.json({
        params: req.params,
        total,
        categorias
    });

}


const crearCategoria = async ( req , res ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDb = await Categoria.findOne( { nombre: nombre.toUpperCase() } );


    if ( categoriaDb ) {
        return res.status(400).json({
            msg: `La categoria ${ nombre }, ya existe`
        });
    }
    
    try {

        const categoria = new Categoria({
            nombre,
            usuario: req.usuario.id 
        });
    
        await categoria.save();
    
    
        res.status(201).json({
            categoria
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error en crear la categoria'
        });
        
    }

}

const obtenerCategoria = async ( req, res ) => {

    const { id } = req.params;

    const categoriaDb = await Categoria.findById( id );

    res.json({
        categoriaDb
    });

}

const actualizarCategoria = async ( req, res ) => {

    const { id } = req.params; 
    const { nombre, estado } = req.body; 

    const data = {
        nombre: nombre.toUpperCase(),
        estado,
        usuario: req.usuario.id
    }

    const categoriaPut = await Categoria.findByIdAndUpdate( id, data, { new: true } )
                            .populate( 'usuario' )

    res.status(201).json({
        categoriaPut
    });

}

const eliminarCategoria = async ( req, res ) => {

    const { id } = req.params;

    const categoriaDelete = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true } )

    res.json({
        categoriaDelete
    });

}


module.exports = {
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias,
    actualizarCategoria,
    eliminarCategoria
}