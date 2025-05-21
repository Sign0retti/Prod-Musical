require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const spotifyRoutes = require('./routes/spotify'); // ajuste o caminho se necessário

app.use('/spotify', spotifyRoutes);

// outras configurações e middlewares...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
