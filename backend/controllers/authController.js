const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ error: 'Email não encontrado' });

  const valido = await bcrypt.compare(senha, user.senha);
  if (!valido) return res.status(400).json({ error: 'Senha incorreta' });

  const token = jwt.sign({ id: user.id, tipo: user.tipo }, JWT_SECRET, { expiresIn: '12h' });
  res.json({ token, tipo: user.tipo, nome: user.nome });
};

________________________________________
backend/controllers/musicController.js
js
CopiarEditar
const { Music } = require('../models');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = require('../config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

exports.enviarMusica = async (req, res) => {
  try {
    const { titulo, genero, data_lancamento } = req.body;
    if (!req.file) return res.status(400).json({ error: 'Arquivo é obrigatório' });

    const musica = await Music.create({
      titulo,
      genero,
      data_lancamento,
      arquivo: req.file.filename,
      userId: req.user.id,
      status: 'pendente',
    });
    res.json(musica);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.minhasMusicas = async (req, res) => {
  const musicas = await Music.findAll({ where: { userId: req.user.id }, order: [['createdAt', 'DESC']] });
  res.json(musicas);
};

exports.listarTodas = async (req, res) => {
  const musicas = await Music.findAll({ order: [['createdAt', 'DESC']] });
  res.json(musicas);
};

exports.atualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, motivo_recusa, produtora, distribuidora } = req.body;
    const musica = await Music.findByPk(id);
    if (!musica) return res.status(404).json({ error: 'Música não encontrada' });

    musica.status = status;
    musica.motivo_recusa = motivo_recusa || null;
    musica.produtora = produtora || null;
    musica.distribuidora = distribuidora || null;
    await musica.save();

    // Enviar email notificando o artista
    const usuario = await musica.getUser();
    await transporter.sendMail({
      from: EMAIL_USER,
      to: usuario.email,
      subject: `Sua música "${musica.titulo}" foi ${status}`,
      text: `Olá ${usuario.nome}, sua música foi ${status}.\nMotivo: ${motivo_recusa || 'Nenhum'}.\nProdutora: ${produtora || 'N/A'}.\nDistribuidora: ${distribuidora || 'N/A'}.`,
    });

    res.json(musica);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.retificarMusica = async (req, res) => {
  try {
    const { id } = req.params;
    const musica = await Music.findByPk(id);
    if (!musica) return res.status(404).json({ error: 'Música não encontrada' });
    if (musica.userId !== req.user.id) return res.status(403).json({ error: 'Não autorizado' });

    const { titulo, genero, data_lancamento } = req.body;
    musica.titulo = titulo;
    musica.genero = genero;
    musica.data_lancamento = data_lancamento;
    musica.status = 'pendente';
    musica.motivo_recusa = null;
    musica.produtora = null;
    musica.distribuidora = null;
    await musica.save();

    res.json(musica);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
