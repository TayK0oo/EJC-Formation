// dao/CategoryDAO.ts
import { ICategoryDAO } from './ICategoryDAO';

export class CategoryDAO implements ICategoryDAO {
  async getCategories(): Promise<string[]> {
    // Dans une application réelle, ceci ferait un appel à une base de données ou une API
    // Pour l'instant, nous retournons une liste mock de catégories
    return [
      "GESTION DE PROJETS",
      "ENTREPRENEURIAT",
      "COMMUNICATION",
      "EFFICACITE PROFESSIONNELLE / MOTIVATION",
      "CREATIVITE / ANIMATION",
      "MANAGEMENT",
      "SYSTEMES D'INFORMATION"
    ];
  }
}

