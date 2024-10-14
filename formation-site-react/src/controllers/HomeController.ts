// controllers/HomeController.ts
import { WooCommerceProductDAO as FormationDAO} from '../dao/WooCommerceDaoProduct';
import { Formation } from '../models/classFormation';
import { Filter } from '../models/Filter';

export class HomeController {
  
  static async getHomePageData(filters?: Filter | null): Promise<{ formations: Formation[] }> {
    const dao = new FormationDAO();
    const formations = await dao.getFormations(filters);

    
    return { formations };
  }
}