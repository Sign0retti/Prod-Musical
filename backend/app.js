const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

sequelize.authenticate().then(() => {
  console.log('Conectado ao PostgreSQL');
}).catch(err => {
  console.error('Erro de conexão:', err);
});


app.use('/api/auth', authRoutes);

const musicRoutes = require('./routes/musicRoutes');
app.use('/api/musicas', musicRoutes);

const artistRoutes = require('./routes/artistRoutes');
app.use('/api/artista', artistRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

const musicRoutes = require('./routes/musicRoutes');
app.use('/api/musicas', musicRoutes);

app.use('/uploads', express.static('uploads'));


module.exports = app;


