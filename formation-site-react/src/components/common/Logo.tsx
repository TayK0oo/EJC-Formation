import React from 'react';
import styles from '../../styles/Logo.module.css';
import LogoImg from '../../ressources/images/Logo.png';

const Logo: React.FC = () => {
    return (
        <div className={styles.logo}>
            <img src={LogoImg} alt="Logo" />
            
        </div>
    );
};

export default Logo;