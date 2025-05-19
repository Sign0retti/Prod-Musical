document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuario = e.target.usuario.value;
  const senha = e.target.senha.value;

  const resposta = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, senha })
  });

  const resultado = await resposta.json();
  if (resposta.ok) {
    alert('Login realizado com sucesso!');
  } else {
    alert(resultado.mensagem);
  }
});
