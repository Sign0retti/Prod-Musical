const Music = require('../models/Music');
const User = require('../models/User');


exports.submeterMusica = async (req, res) => {
  const { titulo, arquivoUrl } = req.body;
  const artistaId = req.user.id;

  try {
    const musica = await Music.create({ titulo, arquivoUrl, artistaId });
    res.status(201).json(musica);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao enviar música', error: err.message });
  }
};

exports.listarMusicasDoArtista = async (req, res) => {
  try {
    const musicas = await Music.findAll({ where: { artistaId: req.user.id } });
    res.json(musicas);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar músicas', error: err.message });
  }
};

exports.listarTodasMusicas = async (req, res) => {
  try {
    const musicas = await Music.findAll({ include: [{ model: User, as: 'artista' }] });
    res.json(musicas);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar músicas', error: err.message });
  }
};

exports.aprovarMusica = async (req, res) => {
  try {
    const musica = await Music.findByPk(req.params.id);
    if (!musica) return res.status(404).json({ message: 'Música não encontrada' });

    musica.status = 'aprovada';
    musica.motivoReprovacao = null;
    musica.produtora = req.body.produtora;
    musica.distribuidora = req.body.distribuidora;
    await musica.save();

    res.json(musica);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao aprovar música', error: err.message });
  }
};

exports.reprovarMusica = async (req, res) => {
  try {
    const musica = await Music.findByPk(req.params.id);
    if (!musica) return res.status(404).json({ message: 'Música não encontrada' });

    musica.status = 'reprovada';
    musica.motivoReprovacao = req.body.motivoReprovacao;
    await musica.save();

    res.json(musica);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao reprovar música', error: err.message });
  }
};


exports.enviarMusica = async (req, res) => {
  try {
    const { titulo, genero, data_lancamento } = req.body;
    const arquivo = req.file?.filename;

    const musica = await Music.create({
      titulo,
      genero,
      data_lancamento,
      arquivo,
      userId: req.user.id,
      status: 'pendente'
    });

    res.status(201).json(musica);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
