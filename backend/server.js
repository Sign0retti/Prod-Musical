const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const { PORT, UPLOAD_DIR } = require('./config');
const path = require('path');
const fs = require('fs');

const authRoutes = require('./routes/authRoutes');
const musicRoutes = require('./routes/musicRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, UPLOAD_DIR)));

app.use('/auth', authRoutes);
app.use('/musicas', musicRoutes);
app.use('/usuarios', userRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
