import { FormationManager } from '../models/FormationManager';
import { FormationDAOImpl } from '../dao/FormationDAOImpl';

export class FormationController {
  private static formationManager = new FormationManager(new FormationDAOImpl());

  static async getAllFormations() {
    return FormationController.formationManager.getAllFormations();
  }

  static async getFormationById(id: string) {
    return FormationController.formationManager.getFormationById(id);
  }
}