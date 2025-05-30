const { Sequelize, DataTypes } = require('sequelize');
const { DB_URL } = require('../config');

const sequelize = new Sequelize(DB_URL, { dialect: 'postgres' });

const User = sequelize.define('User', {
  nome: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  senha: DataTypes.STRING,
  tipo: DataTypes.ENUM('administrador', 'desenvolvedor', 'atendimento', 'artista', 'designer'),
  produtora: DataTypes.STRING,
  produtor_responsavel: DataTypes.STRING,
});

const Music = sequelize.define('Music', {
  titulo: DataTypes.STRING,
  genero: DataTypes.STRING,
  data_lancamento: DataTypes.DATEONLY,
  status: { type: DataTypes.ENUM('pendente', 'aprovada', 'reprovada'), defaultValue: 'pendente' },
  motivo_recusa: DataTypes.TEXT,
  produtora: DataTypes.STRING,
  distribuidora: DataTypes.STRING,
  arquivo: DataTypes.STRING,
});

User.hasMany(Music, { foreignKey: 'userId' });
Music.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Music };
