const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const musicController = require('../controllers/musicController');

router.post('/enviar', auth, role(['artista']), upload.single('arquivo'), musicController.enviarMusica);
router.get('/minhas', auth, role(['artista']), musicController.minhasMusicas);
router.get('/todas', auth, role(['administrador', 'atendimento']), musicController.listarTodas);
router.put('/atualizar/:id', auth, role(['atendimento']), musicController.atualizarStatus);
router.put('/retificar/:id', auth, role(['artista']), musicController.retificarMusica);

module.exports = router;
