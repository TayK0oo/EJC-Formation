import React, { useState, useEffect } from 'react';
import styles from '../../styles/NavigationBar.module.css';
import navStyles from '../../styles/NavSideBar.module.css';
import userIcon from '../../ressources/images/user.svg';
import Unknow from '../../ressources/images/interro.svg';

import LoginView from '../../pages/LoginView';

import { Formation } from '../../models/classFormation';
import { Category } from '../../models/classCategory';
import { FormationController } from '../../controllers/FormationController';

interface NavigationBarCompoProps {
  navigate: (path: string) => void;
  toggleLoginCloud: () => void;
}

const NavigationBarCompo: React.FC<NavigationBarCompoProps> = ({ navigate, toggleLoginCloud }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [formationCategories, setFormationCategories] = useState<Category[]>([]);

  useEffect(() => {
    FormationController.getFormationCategories().then(setFormationCategories);

    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = {
    Accueil: [],
    Formations: formationCategories,
    "À propos": ["Notre histoire", "Notre équipe", "Nos valeurs"],
    Contact: ["Formulaire de contact", "Nos coordonnées", "FAQ"],
  };

  const renderFormations = (category: Category) => {
    if (!category || !Array.isArray(category.items)) {
      console.error('Invalid category structure:', category);
      return null;
    }

    const columns = [];
    const itemsPerColumn = 4;

    for (let i = 0; i < category.items.length; i += itemsPerColumn) {
      columns.push(
        <div key={i} className={styles.formationColumn}>
          {category.items.slice(i, i + itemsPerColumn).map((item: Formation) => (
            <div 
              key={item.id} 
              className={styles.formation}
              onClick={() => navigate(`/formations/${item.id}${item.idR}`)}
            >
              <p>{item.titre}</p>
            </div>
          ))}
        </div>
      );
    }

    return <div className={styles.formationsContainer}>{columns}</div>;
  };

  const handleMenuClick = (key: string) => {
    setActiveMenu(activeMenu === key ? null : key);
  };

  return (
    <div className={`${styles.navigationBar} ${styles.navBarIndex} ${isSticky ? styles.sticky : ''}`}>
      <div className={styles.navContent}>
        <ul className={styles.mainMenu}>
          {Object.entries(menuItems).map(([key, value]) => (
            <li 
              key={key} 
              className={`${styles.menuItem} ${activeMenu === key ? styles.active : ''}`}
              onMouseEnter={() => window.innerWidth > 768 && setActiveMenu(key)}
              onMouseLeave={() => window.innerWidth > 768 && setActiveMenu(null)}
              onClick={() => window.innerWidth <= 768 && handleMenuClick(key)}
            >
              <h2>{key}</h2>
              {value.length > 0 && (
                <div className={`${styles.submenu} ${navStyles.customScrollbar}`}>
                  <div className={styles.submenuContent}>
                    {key === "Formations" ? (
                      value.map((category: any, index: number) => (
                        <div key={index} className={styles.category}>
                          <div className={styles.categoryHeader}>
                            <img src={category.icon || Unknow} alt={category.title} className={styles.icon} />
                            <h3>{category.title}</h3>
                          </div>
                          {renderFormations(category)}
                        </div>
                      ))
                    ) : (
                      <ul>
                        {value.map((item: any, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.userIconContainer}>
          <a onClick={toggleLoginCloud}>
            <img src={userIcon} alt="espace utilisateur" className={styles.userIcon} />
          </a>
        </div>
      </div>
    </div>
  );
};

interface NavigationBarProps {
  navigate: (path: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ navigate }) => {
  const [showLoginCloud, setShowLoginCloud] = useState(false);

  const toggleLoginCloud = () => {
    setShowLoginCloud(!showLoginCloud);
  };

  return (
    <div className={styles.navAndBubbleContainer}>
      <NavigationBarCompo navigate={navigate} toggleLoginCloud={toggleLoginCloud} />
      {showLoginCloud && (
        <div className={styles.loginCloudContainer}>
          <div className={styles.loginCloud}>
            <div className={`${styles.cloudBubble} ${styles.bubble1}`}></div>
            <div className={`${styles.cloudBubbleShadow} ${styles.bubble1Shd}`}></div>
            <div className={`${styles.cloudBubble} ${styles.bubble2}`}></div>
            <div className={`${styles.cloudBubbleShadow} ${styles.bubble2Shd}`}></div>
            <div className={`${styles.cloudBubble} ${styles.bubble3}`}></div>
            <div className={`${styles.cloudBubbleShadow} ${styles.bubble3Shd}`}></div>
            <div className={`${styles.cloudBubble} ${styles.bubble4}`}></div>
            <div className={`${styles.cloudBubbleShadow} ${styles.bubble4Shd}`}></div>
            <div className={`${styles.cloudBubble} ${styles.bubble5}`}></div>
            <div className={`${styles.cloudBubbleShadow} ${styles.bubble5Shd}`}></div>
          </div>
          <div className={styles.loginViewContainer}>
            <LoginView navigate={navigate} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
