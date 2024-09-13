import React, { useState, useEffect } from 'react';
import styles from '../../styles/FilterWindow.module.css';
import FaTrash from '../../ressources/images/poubelle-de-recyclage.png';
import { FilterService } from '../../services/FilterService';
import { Filter } from '../../models/Filter';
import { CategoryController } from '../../controllers/CategoryController';

interface FilterWindowProps {
  onFilterApply: () => void;
}

const FilterWindow: React.FC<FilterWindowProps> = ({ onFilterApply }) => {
  const [filters, setFilters] = useState<Filter>({
    category: '',
    duration: 40,
    price: 2000,
    modality: ''
  });
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const savedFilters = FilterService.getFilters();
    if (savedFilters) {
      setFilters(savedFilters);
    }

    const fetchCategories = async () => {
      const fetchedCategories = await CategoryController.getAllCategories();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  const handleChange = (key: keyof Filter, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    FilterService.saveFilters(filters);
    onFilterApply();
  };

  const clearFilters = () => {
    const defaultFilters: Filter = {
      category: '',
      duration: 40,
      price: 2000,
      modality: ''
    };
    setFilters(defaultFilters);
    FilterService.saveFilters(defaultFilters);
    onFilterApply();
  };

  return (
    <div className={styles.filterWindow}>
      <h3 className={styles.filterTitle}>Filtres</h3>
      <div className={styles.filterOption}>
        <label className={styles.filterLabel} htmlFor="category">Catégorie:</label>
        <select 
          id="category" 
          className={styles.select}
          value={filters.category}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          <option value="">Toutes</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className={styles.filterOption}>
        <label className={styles.filterLabel} htmlFor="duration">Durée maximale: {filters.duration}h</label>
        <input 
          type="range" 
          id="duration" 
          min="0" 
          max="40" 
          step="1" 
          value={filters.duration}
          onChange={(e) => handleChange('duration', Number(e.target.value))}
          className={styles.slider}
        />
      </div>
      <div className={styles.filterOption}>
        <label className={styles.filterLabel} htmlFor="price">Prix maximum: {filters.price}€</label>
        <input 
          type="range" 
          id="price" 
          min="0" 
          max="2000" 
          step="50" 
          value={filters.price}
          onChange={(e) => handleChange('price', Number(e.target.value))}
          className={styles.slider}
        />
      </div>
      <div className={styles.filterOption}>
        <label className={styles.filterLabel} htmlFor="modality">Modalité:</label>
        <select 
          id="modality" 
          className={styles.select}
          value={filters.modality}
          onChange={(e) => handleChange('modality', e.target.value)}
        >
          <option value="">Toutes</option>
          <option value="En ligne">En ligne</option>
          <option value="Présentiel">Présentiel</option>
        </select>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.applyButton} onClick={applyFilters}>Appliquer les filtres</button>
        <button className={styles.clearButton} onClick={clearFilters}>
          <img src={FaTrash} alt="Effacer Filtres" />
        </button>
      </div>
    </div>
  );
};

export default FilterWindow;