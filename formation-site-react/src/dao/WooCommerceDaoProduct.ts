import { IFormationDAO } from './IFormationDAO';
import { Formation } from '../models/classFormation';
import api from '../config/woocommerce';
import adminApi from '../config/woocommerceAdmin';
import { Filter } from '../models/Filter';
import formationsLocalData from '../ressources/formation/formations.json';
import DOMPurify from 'dompurify';

export class WooCommerceProductDAO implements IFormationDAO {
  private formations: Formation[];

  constructor() {
    this.formations = [];
  }

  private sanitizeHtml(html: string): string {
    return DOMPurify.sanitize(html);
  }

  private mapProductToFormation(product: any): Formation {
    return {
      idR: product.id,
      id: product.meta_data.find((meta: any) => meta.key === '_formation_id')?.value || '',
      titre: product.name,
      categorie: product.categories.length > 0 ? product.categories[0].name : 'Non catégorisé',
      duree: product.meta_data.find((meta: any) => meta.key === '_formation_duree')?.value || '',
      tarif: product.price,
      description: this.sanitizeHtml(product.description),
      competencesAcquises: product.meta_data.find((meta: any) => meta.key === '_formation_competences')?.value.split('\n') || [],
      publicCible: product.meta_data.find((meta: any) => meta.key === '_formation_public_cible')?.value.split('\n') || [],
      modalites: product.meta_data.find((meta: any) => meta.key === '_formation_modalites')?.value || '',
      prerequis: product.meta_data.find((meta: any) => meta.key === '_formation_prerequis')?.value || '',
      lieu: product.meta_data.find((meta: any) => meta.key === '_formation_lieu')?.value || '',
      createurId: product.meta_data.find((meta: any) => meta.key === '_createur_id')?.value || '',
    };
  }

  async getAllFormations(): Promise<Formation[]> {
    try {
      const response = await api.get('products', { params: { per_page: 100 } });
      this.formations = response.data.map(this.mapProductToFormation.bind(this));
      
    } catch (error) {
      console.error("Erreur lors de la récupération des formations :", error);
      this.formations = formationsLocalData.formations as Formation[];
    }
    // Enregistre les catégories dans le cache pour les utiliser dans les filtres
    const categories = this.formations.map(f => f.categorie);
    localStorage.setItem('categories', JSON.stringify(categories));

    return this.formations;
  }

  async getFormationById(id: string): Promise<Formation | null> {
    try {
      const response = await api.get(`products/${id}`);
      return this.mapProductToFormation(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération de la formation :", error);
      return formationsLocalData.formations.find(f => f.id === id) as Formation || null;
    }
  }

  async getFormations(filters?: Filter | null): Promise<Formation[]> {
    try {
      const params: any = { per_page: 100, ...filters };
      const response = await api.get('products', { params });
      return response.data.map(this.mapProductToFormation.bind(this));
    } catch (error) {
      console.error("Erreur lors de la récupération des formations avec filtres :", error);
      let formations = formationsLocalData.formations as Formation[];
      return this.applyFilters(formations, filters);
    }
  }

  private applyFilters(formations: Formation[], filters?: Filter | null): Formation[] {
    if (!filters) return formations;

    return formations.filter(f => {
      if (filters.category && !f.categorie.toLowerCase().includes(filters.category.toLowerCase())) {
        return false;
      }
      if (filters.price) {
        const formationPrice = parseFloat(f.tarif.replace(/[^0-9.,]/g, '').replace(',', '.'));
        if (isNaN(formationPrice) || formationPrice > filters.price) {
          return false;
        }
      }
      if (filters.duration) {
        const formationDuration = parseFloat(f.duree.replace(/[^0-9.,]/g, '').replace(',', '.'));
        if (isNaN(formationDuration) || formationDuration > filters.duration) {
          return false;
        }
      }
      return true;
    });
  }

}