import React from 'react';
import styles from '../../styles/SocialIcons.module.css';

const SocialIcons: React.FC = () => {
  return (
    <div className={styles.socialIcons}>
      <div className={styles.icon}>FB</div>
      <div className={styles.icon}>TW</div>
      <div className={styles.icon}>IN</div>
      <div className={styles.icon}>YT</div>
    </div>
  );
};

export default SocialIcons;