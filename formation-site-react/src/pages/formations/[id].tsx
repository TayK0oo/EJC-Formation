import React, { useState, useEffect } from 'react';
import { FormationController } from '../../controllers/FormationController';
import styles from '../../styles/FormationDetail.module.css';
import { Formation } from '../../models/Formation';

interface FormationDetailPageProps {
  navigate: (path: string) => void;
}

const FormationDetailPage: React.FC<FormationDetailPageProps> = ({ navigate }) => {
  const [formation, setFormation] = useState<Formation | null>(null);

  useEffect(() => {
    const fetchFormation = async () => {
      const id = window.location.pathname.split('/').pop() || '';
      const fetchedFormation = await FormationController.getFormationById(id);
      setFormation(fetchedFormation);
    };
    fetchFormation();
  }, []);

  if (!formation) {
    return <div>Chargement...</div>;
  }

  return (
    <div className={styles.formationDetail}>
      <h1>{formation.titre}</h1>
      <p className={styles.category}>Catégorie: {formation.categorie}</p>
      
      <section className={styles.mainInfo}>
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
      </section>

      <section className={styles.description}>
        <h2>Description</h2>
        <p>{formation.description}</p>
      </section>

      <section className={styles.competences}>
        <h2>Compétences acquises</h2>
        <ul>
          {formation.competencesAcquises.map((comp, index) => (
            <li key={index}>{comp}</li>
          ))}
        </ul>
      </section>

      <section className={styles.publicCible}>
        <h2>Public cible</h2>
        <ul>
          {formation.publicCible.map((cible, index) => (
            <li key={index}>{cible}</li>
          ))}
        </ul>
      </section>

      <section className={styles.additionalInfo}>
        <h2>Informations complémentaires</h2>
        <p><strong>Prérequis:</strong> {formation.prerequis}</p>
        <p><strong>Lieu:</strong> {formation.lieu}</p>
      </section>

      <button onClick={() => navigate('/')}>Retour à l'accueil</button>
    </div>
  );
};

export default FormationDetailPage;