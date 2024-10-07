import { Formation } from '../models/classFormation';
import { Filter } from '../models/Filter';


export interface IFormationDAO {
  getAllFormations(): Promise<Formation[]>;
  getFormationById(id: string): Promise<Formation | null>;
  getFormations(filters?: Filter | null): Promise<Formation[]>;
}