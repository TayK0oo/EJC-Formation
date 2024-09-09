import React from 'react';
import styles from '../../styles/SearchBar.module.css';

const SearchBar: React.FC = () => {
  return (
    <div className={styles.searchBar}>
      <input type="text" placeholder="Rechercher une formation..." />
      <button>Rechercher</button>
    </div>
  );
};

export default SearchBar;