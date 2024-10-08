// dao/CategoryDAO.ts
import { ICategoryDAO } from './ICategoryDAO';
import api from '../config/woocommerce';


export class CategoryDAO implements ICategoryDAO {
  private categories: string[] = [];
  
  async getNameCategories(): Promise<string[]> {
    try {
    const response = await api.get('products/categories', { params: { per_page: 100 } });
    this.categories = response.data.map((category: any) => category.name);
    // Enregistre les catégories dans le cache pour les utiliser dans les filtres
    localStorage.setItem('categories', JSON.stringify(this.categories));
    }
    catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
      this.categories = JSON.parse(localStorage.getItem('categories')!);
    }
    return this.categories;
  }
  
}

