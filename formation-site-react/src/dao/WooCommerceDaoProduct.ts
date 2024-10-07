import { IFormationDAO } from './IFormationDAO';
import { Formation } from '../models/classFormation';
import api from '../config/woocommerce';
import adminApi from '../config/woocommerceAdmin'; // Pour la gestion Admin
import { Filter } from '../models/Filter'; // Assurez-vous d'avoir une interface Filter
import formationsLocalData from '../ressources/formation/formations.json'; // Pour les données locales

export class WooCommerceProductDAO implements IFormationDAO {
  private formations: Formation[];

  constructor() {
    this.formations = [];
  }

  // Récupérer toutes les formations
  async getAllFormations(): Promise<Formation[]> {
    try {
      // Effectuer la requête vers l'API WooCommerce pour récupérer tous les produits
      const response = await api.get('products', {
        params: {
          per_page: 100, // Limitez à 100 par page (modifiez selon vos besoins)
        }
      });

      // Transformer la réponse en une liste de formations
      const products = response.data;

      console.log(products);

      this.formations = products.map((product: any) => ({
        idR: product.id,
        id: product.meta_data.find((meta: any) => meta.key === '_formation_id')?.value || '',
        titre: product.name,
        categorie: product.categories.length > 0 ? product.categories[0].name : 'Non catégorisé',
        duree: product.meta_data.find((meta: any) => meta.key === '_formation_duree')?.value || '',
        tarif: product.price,
        description: product.description,
        competencesAcquises: product.meta_data.find((meta: any) => meta.key === '_formation_competences')?.value.split('\n') || [],
        publicCible: product.meta_data.find((meta: any) => meta.key === '_formation_public_cible')?.value.split('\n') || [],
        modalites: product.meta_data.find((meta: any) => meta.key === '_formation_modalites')?.value || '',
        prerequis: product.meta_data.find((meta: any) => meta.key === '_formation_prerequis')?.value || '',
        lieu: product.meta_data.find((meta: any) => meta.key === '_formation_lieu')?.value || '',
        createurId: product.meta_data.find((meta: any) => meta.key === '_createur_id')?.value || '',
      }));

      return this.formations;
    } catch (error) {
      console.error("Erreur lors de la récupération des formations :", error);
      console.log("Chargement des formations locales...");
      return Promise.resolve(formationsLocalData.formations as Formation[]);
    }
  }

  async getFormationById(id: string): Promise<Formation | null> {
    try {
      // Récupérer un produit spécifique par son ID
      const response = await api.get(`products/${id}`);

      const product = response.data;

      if (!product) {
        return null;
      }

      // Transformer le produit en une instance de Formation
      const formation: Formation = {
        idR: product.id,
        id: product.meta_data.find((meta: any) => meta.key === '_formation_id')?.value || '',
        titre: product.name,
        categorie: product.categories.length > 0 ? product.categories[0].name : 'Non catégorisé',
        duree: product.meta_data.find((meta: any) => meta.key === '_formation_duree')?.value || '',
        tarif: product.price,
        description: product.description,
        competencesAcquises: product.meta_data.find((meta: any) => meta.key === '_formation_competences')?.value.split('\n') || [],
        publicCible: product.meta_data.find((meta: any) => meta.key === '_formation_public_cible')?.value.split('\n') || [],
        modalites: product.meta_data.find((meta: any) => meta.key === '_formation_modalites')?.value || '',
        prerequis: product.meta_data.find((meta: any) => meta.key === '_formation_prerequis')?.value || '',
        lieu: product.meta_data.find((meta: any) => meta.key === '_formation_lieu')?.value || '',
        createurId: product.meta_data.find((meta: any) => meta.key === '_createur_id')?.value || '',
      };

      return formation;
    } catch (error) {
      console.error("Erreur lors de la récupération de la formation :", error);
      console.log("Chargement des formations locales...");
      const formation = formationsLocalData.formations.find(f => f.id === id) as Formation;
      return Promise.resolve(formation || null);
    }
  }

  async getFormations(filters?: Filter | null): Promise<Formation[]> {
    try {
      const params: any = {
        per_page: 100, // Limite par page
      };

      // Si des filtres sont appliqués
      if (filters) {
        if (filters.category) {
          params.category = filters.category; // Rechercher par catégorie
        }
        if (filters.duration) {
          params.duree = filters.duration; // Rechercher par durée
        }
        if (filters.price) {
          params.price = filters.price; // Rechercher par prix
        }
        if (filters.modality) {
          params.modalites = filters.modality; // Rechercher par modalité
        }
      }

      // Récupérer les produits filtrés
      const response = await api.get('products', { params });

      const products = response.data;

      // Transformer les produits en une liste de formations
      this.formations = products.map((product: any) => ({
        idR: product.id,
        id: product.meta_data.find((meta: any) => meta.key === '_formation_id')?.value || '',
        titre: product.name,
        categorie: product.categories.length > 0 ? product.categories[0].name : 'Non catégorisé',
        duree: product.meta_data.find((meta: any) => meta.key === '_formation_duree')?.value || '',
        tarif: product.price,
        description: product.description,
        competencesAcquises: product.meta_data.find((meta: any) => meta.key === '_formation_competences')?.value.split('\n') || [],
        publicCible: product.meta_data.find((meta: any) => meta.key === '_formation_public_cible')?.value.split('\n') || [],
        modalites: product.meta_data.find((meta: any) => meta.key === '_formation_modalites')?.value || '',
        prerequis: product.meta_data.find((meta: any) => meta.key === '_formation_prerequis')?.value || '',
        lieu: product.meta_data.find((meta: any) => meta.key === '_formation_lieu')?.value || '',
        createurId: product.meta_data.find((meta: any) => meta.key === '_createur_id')?.value || '',
      }));

      return this.formations;
    } catch (error) {
      console.error("Erreur lors de la récupération des formations avec filtres :", error);
      console.log("Chargement des formations locales...");
      let formations: Formation[] = formationsLocalData.formations as Formation[];
    
    if (filters) {
      formations = formations.filter(f => {
        // Filtre par catégorie
        if (filters.category && !f.categorie.toLowerCase().includes(filters.category.toLowerCase())) {
          return false;
        }
  
        // Filtre par prix
        if (filters.price) {
          const formationPrice = parseFloat(f.tarif.replace(/[^0-9.,]/g, '').replace(',', '.'));
          if (isNaN(formationPrice) || formationPrice > filters.price) {
            return false;
          }
        }
  
        // Filtre par durée
        if (filters.duration) {
          const formationDuration = parseFloat(f.duree.replace(/[^0-9.,]/g, '').replace(',', '.'));
          if (isNaN(formationDuration) || formationDuration > filters.duration) {
            return false;
          }
        }
  
        return true;
      });
    }
  
    return Promise.resolve(formations);
    }
  }
}
