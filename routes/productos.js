const { Router } = require('express');
const { validarJWT, validarCampos } = require('../middlewares');

const { existeCategoria } = require('../helpers/db-validators');
const { crearProdcuto, productos } = require('../controllers/productos');
const { check } = require('express-validator');


const router = Router();


router.post('/', [
    validarJWT,
    check( 'nombre', 'El nombre es requerido' ).not().isEmpty(),
    check( 'categoria', 'El categoria es requerido' ).not().isEmpty()
    .isMongoId().custom( existeCategoria ),
    validarCampos
], crearProdcuto );

router.get('/', [

], productos);

router.put('/');
router.delete('/');


module.exports = router;