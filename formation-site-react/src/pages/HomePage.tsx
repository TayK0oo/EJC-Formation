// src/pages/HomePage.tsx
import React from 'react';
import Header from '../components/layout/Header';
import Navigation from '../components/layout/Navigation';
import Hero from '../components/home/Hero';
import FeatureBlock from '../components/home/FeatureBlock';
// import ContactInfo from '../components/home/ContactInfo';
// import Footer from '../components/layout/Footer';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <main>
        <Hero />
        <FeatureBlock />
        {/* <ContactInfo /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;









