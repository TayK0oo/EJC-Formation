import React from 'react';
import LoginForm from '../components/login/LoginForm';
import styles from '../styles/LoginView.module.css';

interface LoginViewProps{
  navigate: (path: string) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ navigate })=> {
  return (
    <div className={styles.wrapper}>
      <LoginForm navigate= {navigate}/>
    </div>
  );
};

export default LoginView;