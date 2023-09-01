const { Router } = require('express');

const { login, googleSignIn } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get( '/login',[
    check( 'correo', 'El correo es requerido' ).not().isEmpty(),
    check( 'correo', 'El correo no es valido' ).isEmail(),
    check( 'password', 'El password es requerido' ).not().isEmpty(),
    validarCampos
], login );

router.post('/google', [
    check('id_token', 'id_token de google es necesario').not().isEmpty(),
    validarCampos
], googleSignIn )

module.exports = router;