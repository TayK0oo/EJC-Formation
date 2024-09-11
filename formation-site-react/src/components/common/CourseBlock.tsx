import React from 'react';
import styles from '../../styles/CourseBlock.module.css';
import { Formation } from '../../models/Formation';

interface CourseBlockProps {
  formation: Formation;
  onClickMore: () => void;
}

const CourseBlock: React.FC<CourseBlockProps> = ({ formation, onClickMore }) => {
  return (
    <div className={styles.courseBlock}>
      <img src={`/images/${formation.id}.jpg`} alt={formation.titre} />
      <h3>{formation.titre}</h3>
      <p className={styles.category}>{formation.categorie}</p>
      <p className={styles.description}>{formation.description}</p>
      <div className={styles.details}>
        <span>{formation.duree}</span>
        <span>{formation.tarif}</span>
      </div>
      <button onClick={onClickMore}>En savoir plus</button>
    </div>
  );
};

export default CourseBlock;