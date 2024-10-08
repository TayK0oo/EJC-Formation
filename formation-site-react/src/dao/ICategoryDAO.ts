// interfaces/ICategoryDAO.ts
export interface ICategoryDAO {
    getNameCategories(): Promise<string[]> 
  }