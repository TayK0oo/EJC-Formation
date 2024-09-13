import React, { useState, useEffect } from 'react';
import { FormationController } from '../../controllers/FormationController';
import styles from '../../styles/FormationDetail.module.css';
import { Formation } from '../../models/Formation';
import { importImage, imageExists } from '../../utils/imageImporter';

interface FormationDetailPageProps {
  navigate: (path: string) => void;
}

const FormationDetailPage: React.FC<FormationDetailPageProps> = ({ navigate }) => {
  const [formation, setFormation] = useState<Formation | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const fetchFormation = async () => {
      const id = window.location.pathname.split('/').pop() || '';
      const fetchedFormation = await FormationController.getFormationById(id);
      setFormation(fetchedFormation);

      // Charger l'image de la formation en utilisant les 3 premiers caractères de l'ID
      if (fetchedFormation && fetchedFormation.id) {
        const imageName = `${id.substring(0, 3)}.png`;
        const imageFolder = 'categories';
        if (imageExists(imageName, imageFolder)) {
          const src = await importImage(imageName, imageFolder);
          setImageUrl(src);
        } else {
          // Utilisez une image par défaut ou gérez l'absence d'image
          setImageUrl('/path/to/default/image.png');
        }
      }
    };
    fetchFormation();
  }, []);

  if (!formation) {
    return <div>Chargement...</div>;
  }

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <div className={styles.formationDetail}>
      <h1>{formation.titre}</h1>
      
      <div className={styles.mainInfo}>
        <div className={styles.infoItem}>
          <h3>Durée</h3>
          <p>{formation.duree}</p>
        </div>
        <div className={styles.infoItem}>
          <h3>Tarif</h3>
          <p>{formation.tarif}</p>
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
            <p>{formation.description}</p>
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
        <img src={imageUrl} alt={formation.titre} className={styles.formationImage} />
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
            <p>{formation.prerequis}</p>
          </div>
        </div>
      </div>

      <button onClick={() => navigate('/')}>Retour à l'accueil</button>
    </div>
  );
};

export default FormationDetailPage;