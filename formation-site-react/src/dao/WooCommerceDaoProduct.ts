import { IFormationDAO } from './IFormationDAO';
import { Formation } from '../models/classFormation';
import api from '../config/woocommerce';

import dataFormation from '../ressources/formation/formations.json';

import adminApi from '../config/woocommerceAdmin'; // Assurez-vous que ce chemin est correct

//donnée de test avec json

export class WooCommerceProductDAO implements IFormationDAO {
    private formations: Formation[];

    private categories = [
      "ENTREPRENEURIAT",
      "COMMUNICATION",
      "EFFICACITE PROFESSIONNELLE / MOTIVATION",
      "MANAGEMENT"
    ];

    constructor() {
        this.formations = [];
    }

  async getAllFormations(): Promise<Formation[]> {
    try {
        const response = await api.get("products");
        const formations = response.data as Formation[];

        await this.createCategories();
        await this.createFormations();

        return Promise.resolve(formations);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        throw error;
      }
  }

  async getFormationById(id: string): Promise<Formation | null> {
    const formation = this.formations.find(f => f.id === id);
    return Promise.resolve(formation || null);
  }










async createCategories() {
  for (const categoryName of this.categories) {
    try {
      const response = await adminApi.post('products/categories', {
        name: categoryName
      });
      console.log(`Catégorie créée : ${categoryName}`);
    } catch (error) {
      console.error(`Erreur lors de la création de la catégorie ${categoryName}:`, error);
    }
  }
}

async createFormations() {
  this.formations = dataFormation.formations;



  for (const formation of this.formations) {
    try {
      const categoryResponse = await adminApi.get('products/categories', {
        search: formation.categorie
      });
      
      const categoryId = categoryResponse.data[0]?.id;

      const productData = {
        name: formation.titre,
        type: 'simple',
        regular_price: formation.tarif.replace('€', ''),
        description: formation.description,
        short_description: `Durée: ${formation.duree}, Public cible: ${formation.publicCible.join(', ')}`,
        categories: categoryId ? [{ id: categoryId }] : [],
        attributes: [
          {
            name: 'ID',
            visible: true,
            options: [formation.id]
          },
          {
            name: 'Compétences Acquises',
            visible: true,
            options: formation.competencesAcquises
          },
          {
            name: 'Modalités',
            visible: true,
            options: [formation.modalites]
          },
          {
            name: 'Prérequis',
            visible: true,
            options: [formation.prerequis]
          },
          {
            name: 'Lieu',
            visible: true,
            options: [formation.lieu]
          },
          {
            name: 'Créateur ID',
            visible: true,
            options: [formation.createurId]
          }
        ]
      };

      const response = await adminApi.post('products', productData);
      console.log(`Formation créée : ${formation.titre}`);
      console.log(response.data);
    } catch (error) {
      console.error(`Erreur lors de la création de la formation ${formation.titre}:`, error);
    }
  }
}
}