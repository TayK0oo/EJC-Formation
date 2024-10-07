import { FormationManager } from '../models/FormationManager';
import { WooCommerceProductDAO as FormationDAO } from '../dao/WooCommerceDaoProduct';

//#region classes
import { Formation } from '../models/classFormation';
import { Category } from '../models/classCategory';
//#endregion

export class FormationController {
  private static formationManager = new FormationManager(new FormationDAO());

  static async getAllFormations() {
    return this.formationManager.getAllFormations();
  }

  static async getFormationById(id: string): Promise<Formation | null> {
    return this.formationManager.getFormationById(id);
  }

  static async getFormationCategories(): Promise<Category[]> {
    return this.formationManager.getFormationCategories();
  }
}

