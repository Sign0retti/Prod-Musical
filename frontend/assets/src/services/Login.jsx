import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, senha });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('tipo', res.data.tipo);
      localStorage.setItem('nome', res.data.nome);

      if (res.data.tipo === 'administrador') navigate('/admin');
      else if (res.data.tipo === 'artista') navigate('/artista');
      else if (res.data.tipo === 'atendimento') navigate('/atendimento');
      else navigate('/perfil');
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao logar');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 p-6 border rounded">
      <h1 className="text-2xl mb-4">Login</h1>
      {erro && <div className="bg-red-200 p-2 mb-4">{erro}</div>}
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 p-2 border"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        className="w-full mb-3 p-2 border"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Entrar</button>
    </form>
  );
}
