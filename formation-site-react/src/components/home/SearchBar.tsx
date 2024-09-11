import React from 'react';
import styles from '../../styles/SearchBar.module.css';

const SearchBar: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <form>
        <label htmlFor="search">Search</label>
        <input
          required
          pattern=".*\S.*"
          type="search"
          className={styles.input}
          id="search"
        />
        <span className={styles.caret} />
      </form>
    </div>
  );
};

export default SearchBar;