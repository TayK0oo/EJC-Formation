import { Formation } from './Formation';
import { IFormationDAO } from '../dao/IFormationDAO';

export class FormationManager {
  private formationDAO: IFormationDAO;

  constructor(formationDAO: IFormationDAO) {
    this.formationDAO = formationDAO;
  }

  async getAllFormations(): Promise<Formation[]> {
    return this.formationDAO.getAllFormations();
  }

  async getFormationById(id: string): Promise<Formation | null> {
    return this.formationDAO.getFormationById(id);
  }
}