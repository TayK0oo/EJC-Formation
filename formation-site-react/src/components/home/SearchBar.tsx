import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/SearchBar.module.css';
import FilterImg from '../../ressources/images/filter.png';
import FilterWindow from './FilterWindow';

interface SearchBarProps {
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isInputActive, setIsInputActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleInputFocus = () => {
    setIsInputActive(true);
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    if (!filterRef.current?.contains(e.relatedTarget as Node)) {
      setIsInputActive(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node) &&
          filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsInputActive(false);
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSearch}>
        <label htmlFor="search">Search</label>
        <input
          ref={inputRef}
          required
          pattern=".*\S.*"
          type="search"
          className={`${styles.input} ${isInputActive ? styles.active : ''}`}
          id="search"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <span className={styles.caret} />
        <button type="button" className={styles.filterButton} onClick={toggleFilter}>
          <img src={FilterImg} alt="Filter" />
        </button>
      </form>
      {isFilterOpen && <div ref={filterRef}><FilterWindow onFilterApply={onSearch} /></div>}
    </div>
  );
};

export default SearchBar;