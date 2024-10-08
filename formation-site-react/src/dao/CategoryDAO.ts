// dao/CategoryDAO.ts
import { ICategoryDAO } from './ICategoryDAO';
import api from '../config/woocommerce';


export class CategoryDAO implements ICategoryDAO {
  async getCategories(): Promise<string[]> {
    const response = await api.get('products/categories', { params: { per_page: 100 } });
    const categories = response.data.map((category: any) => category.name);
    // Enregistre les catégories dans le cache pour les utiliser dans les filtres
    localStorage.setItem('formation_categories', JSON.stringify(categories));

    return categories;
  }
}

