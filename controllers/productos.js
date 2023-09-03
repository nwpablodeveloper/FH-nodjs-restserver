const { Producto } = require("../models");


const productos = async ( req, res ) => {

 

    const [ total, productos ] = await Promise.all([

        Producto.countDocuments( { estado: true } ),

        Producto.find()
            .populate('usuario', 'nombre correo')
            .populate('categoria', 'nombre')
    ])

    res.json({
        total,
        productos
    });

}


const crearProdcuto = async ( req, res ) => {

    const { nombre, categoria, estado, precio, descripcion, disponible } = req.body ;


    const productoDb = await Producto.findOne( { nombre: nombre.toLowerCase() } );

    if ( productoDb ) {
        return res.status(400).json({
            msg: `El prodúcto ${ nombre } ya existe`
        });
    }
    

    const producto = new Producto ({
        nombre: nombre.toLowerCase(),
        categoria,
        estado,
        usuario: req.usuario.id,
        precio,
        descripcion,
        disponible
    });

    const categoriaDb = await producto.save(  );

    res.status(201).json({
        categoriaDb
    });

}


module.exports = {
    crearProdcuto,
    productos
}