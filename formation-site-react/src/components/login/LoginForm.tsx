import React, { useState } from 'react';
import OAuthButton from './OAuthButton';
import AuthController from '../../controllers/AuthController';
import styles from '../../styles/LoginForm.module.css';
import IconVisionOn from '../../ressources/images/VisionOn.svg';
import IconVisionOff from '../../ressources/images/VisionOff.svg';


interface LoginFormProps {
  navigate: (path: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogin = async () => {
    const success = await AuthController.login(username, password);
    if (success) {
      const courses = await AuthController.getUserCourses();
      console.log('User courses:', courses);
    }
  };
  
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return false;
    }
    const success = await AuthController.register(username, email, password);
    if (success) {
      console.log('Registration successful');
      return success;
    }
  };

  const handleSubmit = async () => {
    let success;
    if (isLogin) {
      success = await handleLogin();
    } else {
      success = await handleRegister();
    }
    if (success) {
      console.log(isLogin ? 'Login successful' : 'Registration successful');
      navigate('/');
    } else {
      console.log(isLogin ? 'Login failed' : 'Registration failed');
      navigate('/error');
    }
  };

  const handleGoogleLogin = async () => {
    const success = await AuthController.loginWithGoogle();
    if (success) {
      console.log('Google login successful');
      navigate('/');
    } else {
      console.log('Google login failed');
      navigate('/error');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);

    setShowConfirmPassword(!showConfirmPassword);
  };


  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <a className={styles.toggleButton} onClick={toggleForm}>
          {isLogin ? "S'inscrire" : "Se connecter"}
        </a>
        <div className={styles.title}>
          <p>{isLogin ? 'Bienvenue,' : 'Créer un compte'}</p>
          <span className={styles.subtitle}>
            {isLogin
              ? 'Connectez-vous pour accéder à votre espace'
              : 'Inscrivez-vous pour commencer'}
          </span>
        </div>
        <OAuthButton onClick={handleGoogleLogin} provider="google">
          Continue with Google
        </OAuthButton>
        <div className={styles.separator}>
          <div className={styles.separatorLine} />
          <span className={styles.separatorText}>OR</span>
          <div className={styles.separatorLine} />
        </div>
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {!isLogin && (
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        <div className={styles.passwordContainer}>
          <input
            className={styles.input}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
    
          <img className={styles.toggleIcon} onClick={togglePasswordVisibility} src={showPassword ? IconVisionOn : IconVisionOff} alt="Toggle visibility" />
          
        </div>
        {!isLogin && (
          <div className={styles.passwordContainer}>
            <input
              className={styles.input}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}
        <OAuthButton onClick={handleSubmit} provider="email">
          {isLogin ? 'Se connecter' : "S'inscrire"}
        </OAuthButton>
      </form>
    </div>
  );
};

export default LoginForm;