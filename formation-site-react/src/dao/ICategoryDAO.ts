// interfaces/ICategoryDAO.ts
export interface ICategoryDAO {
    getCategories(): Promise<string[]> 
  }