// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  // Simulando um banco de dados simples
  const usuarioFake = 'admin';
  const senhaFake = '123456';

  if (usuario === usuarioFake && senha === senhaFake) {
    return res.status(200).json({ mensagem: 'Login bem-sucedido!' });
  } else {
    return res.status(401).json({ mensagem: 'Usuário ou senha incorretos.' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
