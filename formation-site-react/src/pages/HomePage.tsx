import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/header/Header';
import SearchBar from '../components/home/SearchBar';
import NavigationBar from '../components/header/NavigationBar';
import Logo from '../components/common/Logo';
import FormationsOverView from '../components/home/FormationsOverView';
import styles from '../styles/HomePage.module.css';
import { HomeController } from '../controllers/HomeController';
import { Formation } from '../models/classFormation';
import { FilterService } from '../services/FilterService';

interface HomePageProps {
  navigate: (path: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const [formations, setFormations] = useState<Formation[]>([]);

  const applyFilters = useCallback(async () => {
    const filters = FilterService.getFilters();
    const { formations } = await HomeController.getHomePageData(filters);
    setFormations(formations);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div className={styles.homePage}>
      <Header />
      <NavigationBar navigate= {navigate}/>
      <div className={styles.contentWrapper}>
        <div className={styles.logoSearchContainer}>
          <Logo />
          <div className={styles.searchBarWrapper}>
            <div className={styles.groupBubble}>
              <div className={`${styles.searchBubble} ${styles.bubble1}`}></div>
              <div className={`${styles.searchBubble} ${styles.bubble2}`}></div>
              <div className={`${styles.searchBubble} ${styles.bubble3}`}></div>
              <div className={`${styles.searchBubble} ${styles.bubble4}`}></div>
              <div className={`${styles.searchBubble} ${styles.bubble5}`}></div>
              <div className={`${styles.searchBubble} ${styles.bubble7}`}></div>
            </div>
            <SearchBar onSearch={applyFilters} />
          </div>
        </div>
        <main className={styles.mainContent}>
          <FormationsOverView formations={formations} navigate={navigate} onFilterChange={applyFilters} />
        </main>
      </div>
    </div>
  );
};

export default HomePage;