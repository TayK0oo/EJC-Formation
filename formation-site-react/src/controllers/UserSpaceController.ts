import UserFormationService from '../services/UserFormationService';
import UserProgressService from '../services/UserProgressService';
import AuthService from '../services/AuthService';

class UserSpaceController {
  async getUserSpace(): Promise<{ formations: number[], progress: { [formationId: number]: number } }> {
    const userId = AuthService.getUserId();
    const formations = await UserFormationService.getUserFormations(userId);
    const progress: { [formationId: number]: number } = {};

    for (const formationId of formations) {
      progress[formationId] = await UserProgressService.getProgress(userId, formationId);
    }

    return { formations, progress };
  }

  async linkFormationToUser(formationId: number): Promise<void> {
    const userId = AuthService.getUserId();
    await UserFormationService.linkUserToFormation(userId, formationId);
  }

  async updateFormationProgress(formationId: number, progress: number): Promise<void> {
    const userId = AuthService.getUserId();
    await UserProgressService.updateProgress(userId, formationId, progress);
  }
}

export default new UserSpaceController();