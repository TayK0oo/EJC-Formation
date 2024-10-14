// src/components/FormateursOverView.tsx

import React, { useEffect, useState } from 'react';
import styles from '../../styles/Formateurs.module.css';
import { Formateur } from '../../models/classFormateur';
import Flicking from "@egjs/react-flicking";
import { Perspective } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking.css";
import { FormateurController } from '../../controllers/FormateurController';

interface FormateursOverViewProps {
  navigate: (path: string) => void;
}

const FormateursOverView: React.FC<FormateursOverViewProps> = ({ navigate }) => {
  const [formateurs, setFormateurs] = useState<Formateur[]>([]);
  const plugins = [new Perspective({ rotate: 0.5 })];
  const formateurController = new FormateurController();

  useEffect(() => {
    const fetchFormateurs = async () => {
      const fetchedFormateurs = await formateurController.getFormateurs();
      setFormateurs(fetchedFormateurs);
    };

    fetchFormateurs();
  }, []);

  return (
    <div className={styles.formateurs}>
      <h1>Nos formateurs</h1>
      <Flicking circular={true} plugins={plugins}>
        {formateurs.map((formateur) => (
          <div key={formateur.id} className={`${styles.cardPanel} card-panel`}>
            <h3>{`${formateur.prenom} ${formateur.nom}`}</h3>
            <img src={formateur.imageUrl} alt={`${formateur.prenom} ${formateur.nom}`} />
            <p>Email: {formateur.email}</p>
            <p>Téléphone: {formateur.telephone}</p>
            <p>Compétences: {formateur.competences.join(', ')}</p>
            <p>Formations: {formateur.formations.length}</p>
          </div>
        ))}
      </Flicking>
    </div>
  );
};

export default FormateursOverView;
