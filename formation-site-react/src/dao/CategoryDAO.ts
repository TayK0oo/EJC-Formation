// dao/CategoryDAO.ts
import { ICategoryDAO } from './ICategoryDAO';

export class CategoryDAO implements ICategoryDAO {
  async getCategories(): Promise<string[]> {
    // Ici, on simule une requête asynchrone à une base de données
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

