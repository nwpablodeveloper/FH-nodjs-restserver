const { Router } = require('express');

const {  usuariosGet, 
        usuariosPost, 
        usuariosPath, 
        usuariosPut, 
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();



router.get('/', usuariosGet );
router.post('/', usuariosPost );
router.put('/:id', usuariosPut );
router.patch('/', usuariosPath );
router.delete('/', usuariosDelete );


module.exports = router;