import React from 'react';
import styles from '../../styles/CourseBlock.module.css';

interface CourseBlockProps {
  title: string;
  description: string;
  imageUrl: string;
}

const CourseBlock: React.FC<CourseBlockProps> = ({ title, description, imageUrl }) => {
  return (
    <div className={styles.courseBlock}>
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <button>En savoir plus</button>
    </div>
  );
};

export default CourseBlock;