import React, { useState } from 'react';
import styles from '../../styles/NavigationBar.module.css';
import navStyles from '../../styles/NavSideBar.module.css';
import gestionProjetIcon from '../../ressources/images/gestion_projet.png';
import entrepreunariatIcon from '../../ressources/images/entrepreunariat.png';
import efficaciteIcon from '../../ressources/images/motivation.png';
import creatifIcon from '../../ressources/images/creatif.png';
import communicationIcon from '../../ressources/images/communication.png';
import systemeInfoIcon from '../../ressources/images/systeme_info.png';
import managementIcon from '../../ressources/images/management.png';

const NavigationBar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems = {
    Accueil: [],
    Formations: [
      { icon: gestionProjetIcon, title: "GESTION DE PROJETS", items: ["Gestion du temps", "Gestion de l'énergie", "Gestion du cadre de vie", "Méthode de GDP"] },
      { icon: entrepreunariatIcon, title: "ENTREPRENEURIAT", items: ["Penser", "Créer", "Grandir", "Durer"] },
      { icon: communicationIcon, title: "COMMUNICATION", items: ["Communication Non Violente", "Communication assertive/bienveillante", "Outils de Communication en équipe"] },
      { icon: efficaciteIcon, title: "EFFICACITE PROFESSIONNELLE / MOTIVATION", items: ["Valorisation des parcours", "Définition du rêve personnel", "Fresque du conflit", "Formation géométrique", "Formation noclash.io Qualiopi", "Sociogramme 3D", "Synergie score"] },
      { icon: creatifIcon, title: "CREATIVITE / ANIMATION", items: ["Art thérapie", "Mise en mouvement d'un groupe"] },
      { icon: managementIcon, title: "MANAGEMENT", items: ["Leadership", "Prise de décision"] },
      { icon: systemeInfoIcon, title: "SYSTEMES D'INFORMATION", items: ["Création", "Outils de gestion", "Management équipe SI pluridisciplinaire"] },
    ],
    "À propos": ["Notre histoire", "Notre équipe", "Nos valeurs"],
    Contact: ["Formulaire de contact", "Nos coordonnées", "FAQ"],
  };

  const renderFormations = (items: string[]) => {
    const columns = [];
    const itemsPerColumn = 4;

    for (let i = 0; i < items.length; i += itemsPerColumn) {
      columns.push(
        <div key={i} className={styles.formationColumn}>
          {items.slice(i, i + itemsPerColumn).map((item, index) => (
            <div key={index} className={styles.formation}>{item}</div>
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
    <nav className={styles.navigationBar}>
      <ul className={styles.mainMenu}>
        {Object.entries(menuItems).map(([key, value]) => (
          <li 
            key={key} 
            className={`${styles.menuItem} ${activeMenu === key ? styles.active : ''}`}
            onMouseEnter={() => window.innerWidth > 768 && setActiveMenu(key)}
            onMouseLeave={() => window.innerWidth > 768 && setActiveMenu(null)}
            onClick={() => window.innerWidth <= 768 && handleMenuClick(key)}
          >
            <p>{key}</p>
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
                        {renderFormations(category.items)}
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