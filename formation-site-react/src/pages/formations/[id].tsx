import React, { useState, useEffect } from 'react';
import { FormationController } from '../../controllers/FormationController';
import styles from '../../styles/FormationDetail.module.css';
import { Formation } from '../../models/classFormation';

interface FormationDetailPageProps {
  navigate: (path: string) => void;
}

const FormationDetailPage: React.FC<FormationDetailPageProps> = ({ navigate }) => {
  const [formation, setFormation] = useState<Formation | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormation = async () => {
      const fullId = window.location.pathname.split('/').pop() || '';
      const idr = fullId.substring(6);
      const fetchedFormation = await FormationController.getFormationById(idr);
      setFormation(fetchedFormation);
    };
    fetchFormation();
  }, []);

  if (!formation) {
    return <div>Chargement...</div>;
  }

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const renderMultilineText = (text: string) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className={styles.formationDetail}>
      <h1>{formation.titre}</h1>
      
      <div className={styles.mainInfo}>
        <div className={styles.infoItem}>
          <h3>Durée</h3>
          <p>{formation.duree} h</p>
        </div>
        <div className={styles.infoItem}>
          <h3>Tarif</h3>
          <p>{formation.tarif} €</p>
        </div>
        <div className={styles.infoItem}>
          <h3>Modalités</h3>
          <p>{formation.modalites}</p>
        </div>
        <div className={styles.infoItem}>
          <h3>Lieu</h3>
          <p>{formation.lieu}</p>
        </div>
      </div>

      <div className={styles.centralBlock}>
        <div className={styles.descriptionCompetences}>
          <section className={styles.description}>
            <h2>Description</h2>
            <p>{renderMultilineText(formation.description)}</p>
          </section>

          <section className={styles.competences}>
            <h2>Compétences acquises</h2>
            <ul className={styles.competencesList}>
              {formation.competencesAcquises.map((comp, index) => (
                <li key={index}>{comp}</li>
              ))}
            </ul>
          </section>
        </div>
        {formation.imageUrl && (
          <img src={formation.imageUrl} alt={formation.titre} className={styles.formationImage} />
        )}
      </div>

      <div className={styles.accordionSection}>
        <div className={styles.accordionItem}>
          <div 
            className={styles.accordionHeader} 
            onClick={() => toggleAccordion('publicCible')}
          >
            Public cible
          </div>
          <div className={`${styles.accordionContent} ${activeAccordion === 'publicCible' ? styles.active : ''}`}>
            <ul className={styles.publicCibleList}>
              {formation.publicCible.map((cible, index) => (
                <li key={index}>{cible}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.accordionItem}>
          <div 
            className={styles.accordionHeader} 
            onClick={() => toggleAccordion('prerequis')}
          >
            Prérequis
          </div>
          <div className={`${styles.accordionContent} ${activeAccordion === 'prerequis' ? styles.active : ''}`}>
            <ul className={styles.publicCibleList}>
              {formation.prerequis.map((cible, index) => (
                <li key={index}>{cible}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <button onClick={() => navigate('/')}>Retour à l'accueil</button>
    </div>
  );
};

export default FormationDetailPage;