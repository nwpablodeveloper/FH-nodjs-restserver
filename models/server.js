require('colors');
const cors = require('cors');
const express = require('express');


const { dbConection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        
        // RUTAS
        this.paths = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
        };


        // Conectar a DB
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi App
        this.routes();

    }

    async conectarDB() {


        // DB 1
        await dbConection();

        // DB 2
        // await dbConection2();

        // DB 3
        // await dbConection3();

    }

    middlewares() {
        
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('public') );        

    }

    routes() {

        this.app.use( this.paths.auth, require( '../routes/auth' ) );
        this.app.use( this.paths.categorias, require( '../routes/categorias' ) );
        this.app.use( this.paths.productos, require( '../routes/productos' ) );
        this.app.use( this.paths.usuarios, require( '../routes/usuarios' ));

    }

    listen() {

        this.app.listen( this.port, () => {
            console.log( `LOCAL: http://localhost: ${ this.port }`.brightCyan.italic.underline );
        })

    }

}

module.exports = Server