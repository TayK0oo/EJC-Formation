import React, { useState } from 'react';
import AuthController from '../controllers/AuthController';

interface LoginViewProps {
    navigate: (path: string) => void;
    }

const LoginView: React.FC<LoginViewProps> = ({ navigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await AuthController.login(username, password);
    if (success) {
        navigate('/');

    } else {
        navigate('/error')
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nom d'utilisateur"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
      />
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default LoginView;