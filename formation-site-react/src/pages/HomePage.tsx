import React, { useState, useEffect } from 'react';
import Header from '../components/header/Header';
import SearchBar from '../components/home/SearchBar';
import NavigationBar from '../components/header/NavigationBar';
import Logo from '../components/common/Logo';
import FormationsOverView from '../components/home/FormationsOverView';
import styles from '../styles/HomePage.module.css';
import { HomeController } from '../controllers/HomeController';
import { Formation } from '../models/Formation';

interface HomePageProps {
  navigate: (path: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const [formations, setFormations] = useState<Formation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { formations } = await HomeController.getHomePageData();
      setFormations(formations);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.homePage}>
      <Header />
      <NavigationBar />
      <div className={styles.logoSearchContainer}>
        <Logo />
        <div className={styles.searchBarWrapper}>
          <div className={styles.groupBubble}>
            <div className={`${styles.searchBubble} ${styles.bubble1}`}></div>
            <div className={`${styles.searchBubble} ${styles.bubble3}`}></div>
            <div className={`${styles.searchBubble} ${styles.bubble4}`}></div>
          </div>
          <div>
            <SearchBar />
          </div>
        </div>
      </div>
      <main className={styles.mainContent}>
        <FormationsOverView formations={formations} navigate={navigate} />
      </main>
    </div>
  );
};

export default HomePage;