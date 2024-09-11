import { IFormationDAO } from './IFormationDAO';
import { Formation } from '../models/Formation';
import formationsData from '../ressources/formation/formations.json';

//donnée de test avec json

export class FormationDAOImpl implements IFormationDAO {
    private formations: Formation[];

    constructor() {

        this.formations = formationsData.formations as Formation[];
    }

  async getAllFormations(): Promise<Formation[]> {
    return Promise.resolve(this.formations);
  }

  async getFormationById(id: string): Promise<Formation | null> {
    const formation = this.formations.find(f => f.id === id);
    return Promise.resolve(formation || null);
  }
}