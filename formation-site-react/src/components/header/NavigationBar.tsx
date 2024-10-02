import React, { useState, useEffect } from 'react';
import styles from '../../styles/NavigationBar.module.css';
import navStyles from '../../styles/NavSideBar.module.css';

import { Formation } from '../../models/classFormation';
import { Category } from '../../models/classCategory';
import { FormationController } from '../../controllers/FormationController';




interface NavigationBarProps {
  navigate: (path: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({navigate}) => {
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
              onClick={() => navigate(`/formations/${item.id}`)}
            >
              <p>
              {item.titre}
              </p>
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

  const handleCategoryClick = (category: string) => {
    navigate(`/formations?category=${encodeURIComponent(category)}`);
  };

  return (
    <nav className={`${styles.navigationBar} ${isSticky ? styles.sticky : ''}`}>
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
                <div className={styles.submenuContent} >
                  {key === "Formations" ? (
                    value.map((category: any, index: number) => (
                        <div key={index} className={styles.category}>
                          <div className={styles.categoryHeader}>
                            <img src={category.icon} alt={category.title} className={styles.icon} />
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
    </nav>
  );
};

export default NavigationBar;
