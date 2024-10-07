import React, { useState, useEffect, useCallback } from 'react';
import { FormationController } from '../controllers/FormationController';
import { Formation } from '../models/classFormation';

interface TestPageProps {
  navigate: (path: string) => void;
}

const TestPage: React.FC<TestPageProps> = ({ navigate }) => {
    const [formations, setProducts] = useState<Formation[]>([]);
    useEffect(() => {
      const fetchProducts = async () => {
        const data = await FormationController.getAllFormations();
        setProducts(data);
      };
      fetchProducts();
    }, []);
  
    return (
      <div>
        <h2>Liste des produits</h2>
        {formations.map((formation: Formation) => (
          <div key={formation.id}>{formation.description}</div>
        ))}
      </div>
    );
  };

export default TestPage;