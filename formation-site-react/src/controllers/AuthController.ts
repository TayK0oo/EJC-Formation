// src/controllers/AuthController.ts

import AuthService from '../services/AuthService';

class AuthController {
  async login(username: string, password: string): Promise<boolean> {
    return await AuthService.login(username, password);
  }

  async register(username:string, email: string, password: string): Promise<boolean> {
    return await AuthService.register(username, email, password);
  }

  async loginWithGoogle(): Promise<boolean> {
    return await true;
  }


  logout(): void {
    AuthService.logout();
  }

  isAuthenticated(): boolean {
    return AuthService.isAuthenticated();
  }

  async getUserCourses(): Promise<any[]> {
    return await AuthService.getUserCourses();
  }
}

export default new AuthController();