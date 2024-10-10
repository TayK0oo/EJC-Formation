import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

class AuthService {
  private static instance: AuthService;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private baseURL: string = 'https://formations.ejcf.fr/wp-json';

  private constructor() {
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseURL}/jwt-auth/v1/token`, {
        username,
        password
      });
      this.setTokens(response.data.token, response.data.refreshToken);
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  }
  async register(username: string, email: string, password: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseURL}/wp/v2/users`, {
        username,
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa('your_application_password_username:your_application_password')}`
        }
      });
      if (response.status === 201) {
        return await this.login(username, password);
      }
      return false;
    } catch (error) {
      console.error('Registration failed', error);
      return false;
    }
  }
  async refreshAccessToken(): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseURL}/jwt-auth/v1/token/refresh`, {
        refresh_token: this.refreshToken
      });
      this.setTokens(response.data.token, response.data.refreshToken);
      return true;
    } catch (error) {
      console.error('Token refresh failed', error);
      this.logout();
      return false;
    }
  }

  async getUserCourses(): Promise<any[]> {
    try {
      const response = await this.authGet(`${this.baseURL}/wc/v3/customers/${this.getUserId()}/orders`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user courses', error);
      return [];
    }
  }

  logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  }

  private async authGet(url: string): Promise<any> {
    if (this.isTokenExpired(this.accessToken!)) {
      const refreshed = await this.refreshAccessToken();
      if (!refreshed) {
        throw new Error('Session expired');
      }
    }
    return axios.get(url, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });
  }

  private getUserId(): number {
    if (!this.accessToken) return 0;
    const decoded = jwtDecode<DecodedToken>(this.accessToken);
    return decoded.user_id || 0;
  }
}

export default AuthService.getInstance();