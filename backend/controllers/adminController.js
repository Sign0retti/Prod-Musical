const { Op, fn, col, literal } = require('sequelize');
const Music = require('../models/Music');
const { startOfYear, endOfYear } = require('date-fns');

// Músicas por mês no ano atual
exports.dashboardResumo = async (req, res) => {
  const anoAtual = new Date().getFullYear();

  try {
    const musicas = await Music.findAll({
      attributes: [
        [fn('DATE_TRUNC', 'month', col('createdAt')), 'mes'],
        [fn('COUNT', '*'), 'total'],
        [fn('SUM', literal(`CASE WHEN status = 'pendente' THEN 1 ELSE 0 END`)), 'pendentes'],
        [fn('SUM', literal(`CASE WHEN status = 'aprovada' THEN 1 ELSE 0 END`)), 'aprovadas'],
        [fn('SUM', literal(`CASE WHEN status = 'reprovada' THEN 1 ELSE 0 END`)), 'reprovadas']
      ],
      where: {
        createdAt: {
          [Op.between]: [startOfYear(new Date()), endOfYear(new Date())]
        }
      },
      group: [fn('DATE_TRUNC', 'month', col('createdAt'))],
      order: [[fn('DATE_TRUNC', 'month', col('createdAt')), 'ASC']]
    });

    res.json(musicas);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao gerar dashboard', error: err.message });
  }
};
