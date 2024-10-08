// controllers/CategoryController.ts
import { ICategoryDAO } from '../dao/ICategoryDAO';
import { CategoryDAO } from '../dao/CategoryDAO';

export class CategoryController {
  private static categoryDAO: ICategoryDAO = new CategoryDAO();

  static async getAllCategories(): Promise<string[]> {
    return await this.categoryDAO.getNameCategories();
  }
}

