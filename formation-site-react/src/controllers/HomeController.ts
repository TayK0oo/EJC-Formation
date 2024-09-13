// controllers/HomeController.ts
import { FormationDAOImpl } from '../dao/FormationDAOImpl';
import { Formation } from '../models/Formation';
import { Filter } from '../models/Filter';

export class HomeController {
  static async getHomePageData(filters?: Filter | null): Promise<{ formations: Formation[] }> {
    const formations = await FormationDAOImpl.getFormations(filters);
    return { formations };
  }
}