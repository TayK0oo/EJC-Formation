import { IFormationDAO } from './IFormationDAO';
import { Formation } from '../models/classFormation';
import formationsData from '../ressources/formation/formations.json';
import { Filter } from '../models/Filter';

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

  async getFormations(filters?: Filter | null): Promise<Formation[]> {
    let formations: Formation[] = formationsData.formations as Formation[];
    
    if (filters) {
      formations = formations.filter(f => {
        // Filtre par catégorie
        if (filters.category && !f.categorie.toLowerCase().includes(filters.category.toLowerCase())) {
          return false;
        }
  
        // Filtre par prix
        if (filters.price) {
          const formationPrice = parseFloat(f.tarif.replace(/[^0-9.,]/g, '').replace(',', '.'));
          if (isNaN(formationPrice) || formationPrice > filters.price) {
            return false;
          }
        }
  
        // Filtre par durée
        if (filters.duration) {
          const formationDuration = parseFloat(f.duree.replace(/[^0-9.,]/g, '').replace(',', '.'));
          if (isNaN(formationDuration) || formationDuration > filters.duration) {
            return false;
          }
        }
  
        return true;
      });
    }
  
    return Promise.resolve(formations);
  }
}