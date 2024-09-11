import React from 'react';
import styles from '../../styles/Formations.module.css';
import CourseBlock from '../common/CourseBlock';
import { Formation } from '../../models/Formation';

interface FormationsOverViewProps {
  formations: Formation[];
  navigate: (path: string) => void;
}

const FormationsOverView: React.FC<FormationsOverViewProps> = ({ formations, navigate }) => {
  return (
    <div className={styles.formations}>
      <h1>Nos formations</h1>
      <div className={styles.courseGrid}>
        {formations.map((formation) => (
          <CourseBlock
            key={formation.id}
            formation={formation}
            onClickMore={() => navigate(`/formations/${formation.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default FormationsOverView;