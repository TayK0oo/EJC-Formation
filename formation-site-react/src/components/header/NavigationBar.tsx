import React from 'react';
import styles from '../../styles/NavigationBar.module.css';

const NavigationBar: React.FC = () => {
  return (
    <nav className={styles.navigationBar}>
      <ul>
        <li><a href="/">Accueil</a></li>
        <li><a href="/formations">Formations</a></li>
        <li><a href="/about">À propos</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;