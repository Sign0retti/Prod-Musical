const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const userController = require('../controllers/userController');

router.get('/perfil', auth, userController.getPerfil);
router.put('/perfil', auth, userController.updatePerfil);

router.get('/', auth, role(['administrador']), userController.listarUsuarios);
router.post('/', auth, role(['administrador']), userController.cadastrarUsuario);
router.delete('/:id', auth, role(['administrador']), userController.excluirUsuario);
router.put('/:id', auth, role(['administrador']), userController.alterarUsuario);

module.exports = router;
