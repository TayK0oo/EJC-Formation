import React, { useEffect, useState } from 'react';
import styles from '../../styles/CourseBlock.module.css';
import { Formation } from '../../models/Formation';
import { importImage, imageExists } from '../../utils/imageImporter';

interface CourseBlockProps {
  formation: Formation;
  onClickMore: () => void;
}

const CourseBlock: React.FC<CourseBlockProps> = ({ formation, onClickMore }) => {
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    const loadImage = async () => {
      const imageName = `${formation.id.substring(0, 3)}.png`;
      const imageFolder = 'categories';
      if (imageExists(imageName, imageFolder)) {
        const src = await importImage(imageName, imageFolder);
        setImageSrc(src);
      } else {
        // Utilisez une image par défaut ou gérez l'absence d'image
        setImageSrc('/path/to/default/image.png');
      }
    };

    loadImage();
  }, [formation.id]);


  return (
    <div className={styles.card}>
      <div className={styles.topSection}>
        <div className={styles.border}></div>
        <div className={styles.icons}>
          <div className={styles.logo}>
            <img src={imageSrc} alt={formation.categorie} />
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
            <span className={styles.bigText}>{formation.duree}</span>
            <span className={styles.regularText}>Durée</span>
          </div>
          <div className={styles.item}>
            <span className={styles.bigText}>{formation.tarif}</span>
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