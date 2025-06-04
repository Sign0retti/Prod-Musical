import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardArtista from './pages/DashboardArtista';
import Perfil from './pages/Perfil';
import EnviarMusica from './pages/EnviarMusica';
import Usuarios from './pages/Usuarios';
import Atendimento from './pages/Atendimento';
import { useEffect, useState } from 'react';

function PrivateRoute({ children, roles }) {
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    setUserRole(localStorage.getItem('tipo'));
  }, []);
  if (!userRole) return <Navigate to="/login" />;
  if (!roles.includes(userRole)) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute roles={['administrador']}>
              <DashboardAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <PrivateRoute roles={['administrador']}>
              <Usuarios />
            </PrivateRoute>
          }
        />
        <Route
          path="/artista"
          element={
            <PrivateRoute roles={['artista']}>
              <DashboardArtista />
            </PrivateRoute>
          }
        />
        <Route
          path="/enviar"
          element={
            <PrivateRoute roles={['artista']}>
              <EnviarMusica />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute roles={['administrador', 'artista', 'atendimento', 'designer', 'desenvolvedor']}>
              <Perfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/atendimento"
          element={
            <PrivateRoute roles={['atendimento']}>
              <Atendimento />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
