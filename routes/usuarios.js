const {Router}= require ('express')
const {check} = require ('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { esRolValido, esCorreoValido, esUsuarioValido } = require('../helpers/db-validators');
const {usuariosGet,usuariosPut,usuariosPost,usuariosDelete} = require('../controllers/usuarios');
const { is } = require('express/lib/request');

const router = Router();
//const jsonParser = bodyParser.body();

router.get('/', usuariosGet);

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(esUsuarioValido),
    check('rol').custom(esRolValido),
    validarCampos
] ,usuariosPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener un largo de 6').isLength({min:6}),
    check('correo').custom(esCorreoValido),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);

router.delete('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(esUsuarioValido),
    validarCampos

], usuariosDelete);



module.exports = router;








