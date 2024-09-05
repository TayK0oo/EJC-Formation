// src/components/layout/Navigation.tsx
import React from 'react';

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><a href="/">Accueil</a></li>
        <li><a href="/formations">Formations</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;