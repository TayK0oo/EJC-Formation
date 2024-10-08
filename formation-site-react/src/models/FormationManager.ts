import { Formation } from './classFormation';
import { Category } from './classCategory';
import { IFormationDAO } from '../dao/IFormationDAO';
import {importImage} from '../utils/imageImporter';




export class FormationManager {
  private formationDAO: IFormationDAO;

  constructor(formationDAO: IFormationDAO) {
    this.formationDAO = formationDAO;
  }

  async getAllFormations(): Promise<Formation[]> {
    return await this.formationDAO.getAllFormations();
  }

  async getFormationById(id: string): Promise<Formation | null> {

    return await this.formationDAO.getFormationById(id);
  }

  async getFormationCategories(): Promise<Category[]> {

    // Check if categories are already stored in local storage
    if (1+1==3/*localStorage.getItem('categories')*/) {
      return JSON.parse(localStorage.getItem('categories')!);
      
    }
    else {

    const formations = await this.formationDAO.getAllFormations();
    const categories: { [key: string]: Category } = {};


    for (const formation of formations) {
      if (!categories[formation.categorie]) {
        let iconFirstChar = formation.id.substring(0, 3);
        const icon = await importImage(iconFirstChar + ".png", "categories");

        categories[formation.categorie] = {
          title: formation.categorie,
          icon: icon,
          items: []
        };
      }
      
      categories[formation.categorie].items.push(formation);



    }

    localStorage.setItem('categories', JSON.stringify(Object.values(categories)));
    return Object.values(categories);
  }
  }
}