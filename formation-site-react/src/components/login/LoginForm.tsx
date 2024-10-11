import React, { useState, useEffect } from 'react';
import { lastValueFrom } from 'rxjs';

import OAuthButton from './OAuthButton';
import PasswordStrengthIndicator from '../common/PasswordStrenghtIndicator'
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
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(password === confirmPassword || confirmPassword === '');
  }, [password, confirmPassword]);

 
  const handleLogin = async () => {
    try {
      const success = await lastValueFrom(AuthController.login(username, password));
      if (success) {
        const courses = await lastValueFrom(AuthController.getUserCourses());
        console.log('User courses:', courses);
      }
      return success;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };
  
  const handleRegister = async () => {
    if (!passwordMatch) {
      console.log('Passwords do not match');
      return false;
    }
    try {
      const success = await lastValueFrom(AuthController.register(username, email, password));
      if (success) {
        console.log('Registration successful');
      }
      return success;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };
  
  const handleSubmit = async () => {
    if (!isLogin && !passwordMatch) {
      return;
    }
    let success;
    try {
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
    } catch (error) {
      console.error('Submit error:', error);
      navigate('/error');
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      const success = await lastValueFrom(AuthController.loginWithGoogle());
      if (success) {
        console.log('Google login successful');
        navigate('/');
      } else {
        console.log('Google login failed');
        navigate('/error');
      }
    } catch (error) {
      console.error('Google login error:', error);
      navigate('/error');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPasswordMatch(true);
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
          <>
          <PasswordStrengthIndicator password={password} />
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
            {!passwordMatch && (
              <p className={styles.errorText}>Les mots de passe ne correspondent pas.</p>
            )}
          </>
        )}
        <OAuthButton onClick={handleSubmit} provider="email" disabled={!isLogin && !passwordMatch}>
          {isLogin ? 'Se connecter' : "S'inscrire"}
        </OAuthButton>
      </form>
    </div>
  );
};

export default LoginForm;