// services/FormationService.ts
import { Formation } from '../models/Formation';

export class FormationService {
  private static FORMATION_KEY = 'current_formation';

  static saveFormationDetails(formation: Formation): void {
    localStorage.setItem(this.FORMATION_KEY, JSON.stringify(formation));
  }

  static getFormationDetails(): Formation | null {
    const formation = localStorage.getItem(this.FORMATION_KEY);
    return formation ? JSON.parse(formation) : null;
  }

  static clearFormationDetails(): void {
    localStorage.removeItem(this.FORMATION_KEY);
  }
}