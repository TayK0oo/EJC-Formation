// src/components/layout/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header>
      <div className="contact-info">
        <span>Téléphone : 01 23 45 67 89</span>
        <span>Email : contact@jecformation.com</span>
      </div>
    </header>
  );
};

export default Header;