const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const {  usuariosGet, 
        usuariosPost, 
        usuariosPath, 
        usuariosPut, 
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();



router.get('/', usuariosGet );

router.post('/', [
        check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
        check( 'password', 'La contraseña es obligatorio' ).not().isEmpty(),
        check( 'password', 'La contraseña tiene que tener como minimo 8 caracteres' ).isLength({ min: 8 }),
        check( 'correo', 'El correo no es valido' ).isEmail(),
        check( 'correo' ).custom( emailExiste ),
        // check( 'rol', 'No es un rol válido' ).isIn( ['ADMIN_ROLE', 'USER_ROLE'] ),
        // check('rol').custom( rol => esRoleValido(rol) ), OPTIMIZADA EN LA LINEA DE ABAJO
        check('rol').custom( esRoleValido ),
        validarCampos
], usuariosPost );

router.put('/:id', [
        check( 'id', 'No es un ID valido' ).isMongoId(),
        check( 'id' ).custom( existeUsuarioPorId ),
        check('rol').custom( esRoleValido ),
        validarCampos
], usuariosPut );


router.delete('/:id', [
        check( 'id', 'No es in ID valido' ).not().isEmpty(),
        check( 'id', 'No es in ID valido' ).isMongoId(),
        check( 'id' ).custom( existeUsuarioPorId ),
        validarCampos
],usuariosDelete );



module.exports = router;