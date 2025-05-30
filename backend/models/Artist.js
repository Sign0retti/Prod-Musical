const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Artist = sequelize.define('Artist', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  produtora: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  produtorPrincipal: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  redesSociais: {
    type: DataTypes.JSONB,
    allowNull: true,
  }
});

// Relacionamento 1:1 com o usuário (só para artistas)
Artist.belongsTo(User, { foreignKey: 'userId', as: 'usuario' });

module.exports = Artist;
