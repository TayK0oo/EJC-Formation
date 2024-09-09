import React from 'react';
import Header from '../components/header/Header';
import CourseBlock from '../components/common/CourseBlock';
import SearchBar from '../components/home/SearchBar';
import NavigationBar from '../components/header/NavigationBar';
import styles from '../styles/HomePage.module.css';

const HomePage: React.FC = () => {
  const courses = [
    { title: 'Formation 1', description: 'Description de la formation 1', imageUrl: 'url1' },
    { title: 'Formation 2', description: 'Description de la formation 2', imageUrl: 'url2' },
    { title: 'Formation 3', description: 'Description de la formation 3', imageUrl: 'url3' },
  ];

  return (
    <div className={styles.homePage}>
      <Header />

      <NavigationBar />


      <div className={styles.logoSearchContainer}>
        {/* <Logo /> */}
        <SearchBar />
      </div>


      <main className={styles.mainContent}>
        <h1>Nos formations</h1>
        <div className={styles.courseGrid}>
          {courses.map((course, index) => (
            <CourseBlock key={index} {...course} />
          ))}
        </div>
        <div className={styles.courseGrid}>
          {courses.map((course, index) => (
            <CourseBlock key={index} {...course} />
          ))}
        </div>
        <div className={styles.courseGrid}>
          {courses.map((course, index) => (
            <CourseBlock key={index} {...course} />
          ))}
        </div>
        <div className={styles.courseGrid}>
          {courses.map((course, index) => (
            <CourseBlock key={index} {...course} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;