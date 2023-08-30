const { Router } = require('express');

const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get( '/login',[
    check( 'correo', 'El correo es requerido' ).not().isEmpty(),
    check( 'correo', 'El correo no es valido' ).isEmail(),
    check( 'password', 'El password es requerido' ).not().isEmpty(),
    validarCampos
], login );


module.exports = router;