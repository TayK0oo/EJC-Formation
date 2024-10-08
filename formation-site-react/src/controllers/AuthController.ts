import AuthService from '../services/AuthService';

class AuthController {
  async login(username: string, password: string): Promise<boolean> {
    return await AuthService.login(username, password);
  }

  logout(): void {
    AuthService.logout();
  }

  isAuthenticated(): boolean {
    return AuthService.isAuthenticated();
  }
}

export default new AuthController();