import React, { useState } from 'react';
import styles from '../../styles/ContactBar.module.css';
import Tel from '../../ressources/images/tel.png';
import Email from '../../ressources/images/email.png';

const ContactBar: React.FC = () => {
  const [showPhoneOptions, setShowPhoneOptions] = useState(false);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent("Intérêt pour vos formations");
    const body = encodeURIComponent("Bonjour, je suis très intéressé par vos merveilleuses formations mais plus particulièrement celle-ci ...");
    window.location.href = `mailto:contact@example.com?subject=${subject}&body=${body}`;
  };

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowPhoneOptions(true);
  };

  const handleCallClick = () => {
    window.location.href = "tel:+33123456789";
    setShowPhoneOptions(false);
  };

  const handleSmsClick = () => {
    window.location.href = "sms:+33123456789";
    setShowPhoneOptions(false);
  };

  return (
    <div className={styles.contactBar}>
      <span>
        <img src={Email} alt="Email" />
        <a href="mailto:contact.ejcformations@gmail.com" onClick={handleEmailClick}>
          Envoyer un mail
        </a>
      </span>
      <span>
        <img src={Tel} alt="Téléphone" />
        <a href="tel:+33123456789" onClick={handlePhoneClick}>
          Contact Par Téléphone
        </a>
        {showPhoneOptions && (
          <div className={styles.phoneOptions}>
            <button onClick={handleCallClick}>Appeler</button>
            <button onClick={handleSmsClick}>Envoyer un SMS</button>
          </div>
        )}
      </span>
    </div>
  );
};

export default ContactBar;