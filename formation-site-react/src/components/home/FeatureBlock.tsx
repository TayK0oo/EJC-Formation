
// src/components/home/FeatureBlock.tsx
import React from 'react';
import Card from '../common/Card';

const FeatureBlock: React.FC = () => {
  return (
    <section className="features">
      <Card title="Formations certifiantes" content="Des formations reconnues par l'État" />
      <Card title="Experts formateurs" content="Des professionnels expérimentés" />
      <Card title="Suivi personnalisé" content="Un accompagnement sur mesure" />
    </section>
  );
};


export default FeatureBlock;