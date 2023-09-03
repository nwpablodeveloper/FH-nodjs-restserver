const { Router } = require('express');

const { 
    actualizarCategoria, 
    eliminarCategoria, 
    crearCategoria, 
    obtenerCategoria,
    obtenerCategorias} = require('../controllers/categorias');

const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { existeCategoria } = require('../helpers/db-validators');

const router = Router();


// Obtener todas las categoras
router.get('/', [

], obtenerCategorias );


// Obtener 1 categoria por medio del id
router.get('/:id', [
    check( 'id', 'No es una ID valido' ).isMongoId()
    .custom( existeCategoria ),
    validarCampos
], obtenerCategoria );


// Crear 1 catagoria - Privado con un token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre de la categoria es requerido').not().isEmpty(),
    validarCampos
], crearCategoria );


// Actualizar la categoria - privado con token valido
router.put('/:id', [
    validarJWT,
    check( 'id', 'No es un ID valido' ).isMongoId()
    .custom( existeCategoria ),
    validarCampos
], actualizarCategoria );


// Eliminar una categoria solo si tiene permisos de Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check( 'id', 'No es un ID valido' ).isMongoId()
    .custom( existeCategoria ),
    validarCampos
], eliminarCategoria );


module.exports = router