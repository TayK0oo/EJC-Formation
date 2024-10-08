import axios from 'axios';

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await axios.post('https://formations.ejcf.fr/wp-json/jwt-auth/v1/token', {
        username,
        password
      });
      this.token = response.data.token;
      if (this.token) {
        localStorage.setItem('token', this.token);
      }
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default AuthService.getInstance();