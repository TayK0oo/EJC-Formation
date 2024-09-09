import React from 'react';
import styles from '../../styles/ContactBar.module.css';

const ContactBar: React.FC = () => {
  return (
    <div className={styles.contactBar}>
      <span>Email: contact@example.com</span>
      <span>Téléphone: +33 1 23 45 67 89</span>
    </div>
  );
};

export default ContactBar;