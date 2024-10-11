import React, { useEffect, useState } from 'react';
import styles from '../../styles/CourseBlock.module.css';
import { Formation } from '../../models/classFormation';
import { importImage, imageExists } from '../../utils/imageImporter';
import Unknow from '../../ressources/images/interro.svg';

interface CourseBlockProps {
  formation: Formation;
  onClickMore: () => void;
}

const CourseBlock: React.FC<CourseBlockProps> = ({ formation, onClickMore }) => {
  const [categoryImageSrc, setCategoryImageSrc] = useState<string>('');

  useEffect(() => {
    const loadCategoryImage = async () => {
      const imageName = `${formation.id.substring(0, 3)}.png`;
      const imageFolder = 'categories';
      if (imageExists(imageName, imageFolder)) {
        const src = await importImage(imageName, imageFolder);
        setCategoryImageSrc(src);
      } else {
        setCategoryImageSrc(Unknow);
      }
    };
    console.log(formation.imageUrl);

    loadCategoryImage();
  }, [formation.id]);

  return (
    <div className={styles.card}>
      <div className={styles.topSection} style={{
    backgroundImage: `url(${formation.imageUrl || ''})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}>
        <div className={styles.border}></div>
        <div className={styles.icons}>
          <div className={styles.logo}>
            <img src={categoryImageSrc} alt={formation.categorie} />
          </div>
          <div className={styles.socialMedia}>
            <button onClick={onClickMore}>Je veux!</button>
          </div>
          
          
        </div>
      </div>
      <div className={styles.bottomSection}>
        <span className={styles.title}>{formation.titre}</span>
        <div className={`${styles.row} ${styles.row1}`}>
          <div className={styles.item}>
            <span className={styles.bigText}>{formation.duree} h</span>
            <span className={styles.regularText}>Durée</span>
          </div>
          <div className={styles.item}>
            <span className={styles.bigText}>{formation.tarif} €</span>
            <span className={styles.regularText}>Tarif</span>
          </div>
          <div className={styles.item}>
            <span className={styles.bigText}>{formation.modalites}</span>
            <span className={styles.regularText}>Modalité</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBlock;