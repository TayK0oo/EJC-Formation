import React from 'react';
import ContactBar from './ContactBar';
import SocialIcons from '../common/SocialIcons';
import styles from '../../styles/Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <ContactBar />
      <div className={styles.stickyNav}>
        <SocialIcons />
      </div>
      
    </header>
  );
};

export default Header;