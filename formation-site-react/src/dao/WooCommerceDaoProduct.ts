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
      id: this.findMetaDataValue(product.meta_data, '_formation_id'),
      titre: product.name,
      categorie: product.categories.length > 0 ? product.categories[0].name : 'Non catégorisé',
      duree: this.findMetaDataValue(product.meta_data, '_formation_duree'),
      tarif: product.price,
      description: this.sanitizeAndFormatHtml(product.description),
      competencesAcquises: this.splitAndTrimLines(this.findMetaDataValue(product.meta_data, '_formation_competences')),
      publicCible: this.splitAndTrimLines(this.findMetaDataValue(product.meta_data, '_formation_public_cible')),
      modalites: this.findMetaDataValue(product.meta_data, '_formation_modalites'),
      prerequis: this.findMetaDataValue(product.meta_data, '_formation_prerequis'),
      lieu: this.findMetaDataValue(product.meta_data, '_formation_lieu'),
      createurId: this.findMetaDataValue(product.meta_data, '_createur_id'),
    };
  }

  private findMetaDataValue(metaData: any[], key: string): string {
    const item = metaData.find(meta => meta.key === key);
    return item ? item.value : '';
  }
  
  private sanitizeAndFormatHtml(html: string): string {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li'],
      ALLOWED_ATTR: []
    });
  }
  
  private splitAndTrimLines(value: string): string[] {
    if (!value) return [];
    return value.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  }

  async getAllFormations(): Promise<Formation[]> {
    try {
      const response = await api.get('products', { params: { per_page: 100 } });
      this.formations = response.data.map(this.mapProductToFormation.bind(this));
      this.cacheCategories();
      return this.formations;
    } catch (error) {
      console.error("Erreur lors de la récupération des formations :", error);
      this.formations = formationsLocalData.formations as Formation[];
      return this.formations;
    }
  }

  private cacheCategories(): void {
    const categories = [...new Set(this.formations.map(f => f.categorie))];
    localStorage.setItem('categories', JSON.stringify(categories));
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
      const response = await api.get('products', { params: { per_page: 100 } });
      let formations = response.data.map(this.mapProductToFormation.bind(this));
      return this.applyFilters(formations, filters);
    } catch (error) {
      console.error("Erreur lors de la récupération des formations avec filtres :", error);
      let formations = formationsLocalData.formations as Formation[];
      return this.applyFilters(formations, filters);
    }
  }

  private applyFilters(formations: Formation[], filters?: Filter | null): Formation[] {
    if (!filters) return formations;

    return formations.filter(f => {
      if (filters.category && !f.categorie.toLowerCase().includes(filters.category.toLowerCase())) return false;
      if (filters.price && parseFloat(f.tarif) > filters.price) return false;
      if (filters.duration && parseFloat(f.duree) > filters.duration) return false;
      if (filters.modality && !f.modalites.toLowerCase().includes(filters.modality.toLowerCase())) return false;
      return true;
    });
  }

  async getFormationsByCategory(category: string): Promise<Formation[]> {
    try {
      const categoryId = await this.getCategoryIdByName(category);
      if (!categoryId) throw new Error("Catégorie non trouvée");
      
      const response = await api.get('products', { params: { category: categoryId, per_page: 100 } });
      return response.data.map(this.mapProductToFormation.bind(this));
    } catch (error) {
      console.error("Erreur lors de la récupération des formations par catégorie :", error);
      return formationsLocalData.formations.filter(f => f.categorie.toLowerCase() === category.toLowerCase()) as Formation[];
    }
  }

  private async getCategoryIdByName(name: string): Promise<number | null> {
    try {
      const response = await api.get('products/categories', { params: { search: name } });
      return response.data[0]?.id || null;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'identifiant de la catégorie :", error);
      return null;
    }
  }
}