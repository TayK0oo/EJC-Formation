import { Formation } from '../models/classFormation';

export interface IFormationDAO {
  getAllFormations(): Promise<Formation[]>;
  getFormationById(id: string): Promise<Formation | null>;
}