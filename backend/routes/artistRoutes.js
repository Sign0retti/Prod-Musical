const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);
router.use(roleMiddleware(['artista']));

router.get('/perfil', artistController.getPerfil);
router.put('/perfil', artistController.atualizarPerfil);

module.exports = router;
