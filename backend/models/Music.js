const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User');


const Music = db.define('Music', {
  titulo: DataTypes.STRING,
  genero: DataTypes.STRING,
  data_lancamento: DataTypes.DATEONLY,
  arquivo: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM('pendente', 'aprovada', 'reprovada'),
    defaultValue: 'pendente',
  },
  motivo_recusa: DataTypes.STRING,
  produtora: DataTypes.STRING,
  distribuidora: DataTypes.STRING
});

// Associação: uma música pertence a um artista
Music.belongsTo(User, { as: 'artista', foreignKey: 'artistaId' });

User.hasMany(Music, { foreignKey: 'userId' });
Music.belongsTo(User, { foreignKey: 'userId' });



module.exports = Music;
