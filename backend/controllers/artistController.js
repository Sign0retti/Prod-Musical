const Artist = require('../models/Artist');

exports.getPerfil = async (req, res) => {
  try {
    const perfil = await Artist.findOne({ where: { userId: req.user.id } });
    if (!perfil) return res.status(404).json({ message: 'Perfil não encontrado' });

    res.json(perfil);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar perfil do artista', error: err.message });
  }
};

exports.atualizarPerfil = async (req, res) => {
  try {
    let perfil = await Artist.findOne({ where: { userId: req.user.id } });

    if (!perfil) {
      perfil = await Artist.create({ ...req.body, userId: req.user.id });
    } else {
      await perfil.update(req.body);
    }

    res.json(perfil);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar perfil', error: err.message });
  }
};
