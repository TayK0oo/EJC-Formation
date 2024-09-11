import { FormationController } from './FormationController';

export class HomeController {
  static async getHomePageData() {
    const formations = await FormationController.getAllFormations();
    // Vous pouvez ajouter d'autres données nécessaires pour la page d'accueil ici
    return { formations };
  }
}