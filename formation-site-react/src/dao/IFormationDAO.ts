import { Formation } from '../models/Formation';

export interface IFormationDAO {
  getAllFormations(): Promise<Formation[]>;
  getFormationById(id: string): Promise<Formation | null>;
}