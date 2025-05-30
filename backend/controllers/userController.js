const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.getPerfil = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ['id', 'nome', 'email', 'produtora', 'produtor_responsavel', 'tipo'],
  });
  res.json(user);
};

exports.updatePerfil = async (req, res) => {
  const { nome, senha } = req.body;
  const user = await User.findByPk(req.user.id);
  if (nome) user.nome = nome;
  if (senha) user.senha = await bcrypt.hash(senha, 10);
  await user.save();
  res.json({ message: 'Perfil atualizado' });
};

exports.listarUsuarios = async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'nome', 'email', 'tipo', 'produtora', 'produtor_responsavel'] });
  res.json(users);
};

exports.cadastrarUsuario = async (req, res) => {
  const { nome, email, senha, tipo, produtora, produtor_responsavel } = req.body;
  const hash = await bcrypt.hash(senha, 10);
  try {
    const user = await User.create({ nome, email, senha: hash, tipo, produtora, produtor_responsavel });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao cadastrar usuário: ' + err.message });
  }
};

exports.excluirUsuario = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  await user.destroy();
  res.json({ message: 'Usuário excluído' });
};

exports.alterarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, tipo, produtora, produtor_responsavel } = req.body;
  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  if (nome) user.nome = nome;
  if (email) user.email = email;
  if (senha) user.senha = await bcrypt.hash(senha, 10);
  if (tipo) user.tipo = tipo;
  if (produtora) user.produtora = produtora;
  if (produtor_responsavel) user.produtor_responsavel = produtor_responsavel;
  await user.save();
  res.json(user);
};
