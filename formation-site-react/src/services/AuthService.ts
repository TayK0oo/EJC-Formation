import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

interface DecodedToken {
  exp: number;
  user_id: number;
  [key: string]: any;
}

class AuthService {
  private static instance: AuthService;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private readonly baseURL: string = 'https://formations.ejcf.fr/wp-json';
  private isLoading = new BehaviorSubject<boolean>(false);

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

  private post(url: string, data: any): Observable<any> {
    if (this.isLoading.value) {
      return throwError(() => new Error('DoubleRequest'));
    }

    this.isLoading.next(true);

    return new Observable(observer => {
      axios.post(`${this.baseURL}${url}`, data)
        .then(res => {
          observer.next(res.data);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        })
        .finally(() => {
          this.isLoading.next(false);
        });
    }).pipe(
      catchError(error => {
        console.error(`Request to ${url} failed`, error);
        return throwError(() => error);
      })
    );
  }

  login(username: string, password: string): Observable<any> {
    return this.post('/jwt-auth/v1/token', { username, password }).pipe(
      tap((response: { token: string; refreshToken: string }) => {
        this.setTokens(response.token, response.refreshToken);
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.post('/ejcf/v1/register', { username, email, password }).pipe(
      tap(response => {
        if (response.status === 201 || response.status === 200) {
          return this.login(username, password);
        }
      })
    );
  }

  async refreshAccessToken(): Promise<boolean> {
    try {
      if (!this.refreshToken) {
        throw new Error('No refresh token available');
      }
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

  getUserCourses(): Observable<any[]> {
    return new Observable(observer => {
      const userId = this.getUserId();
      if (!userId) {
        observer.error(new Error('User ID not available'));
        return;
      }

      this.authGet(`${this.baseURL}/wc/v3/customers/${userId}/orders`)
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          console.error('Failed to fetch user courses', error);
          observer.error(error);
        });
    });
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
    return !!this.accessToken && !this.isTokenExpired(this.accessToken);
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    console.log(accessToken);
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
    if (!this.accessToken || this.isTokenExpired(this.accessToken)) {
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

  

  public getUserId(): number {
    if (!this.accessToken) return 0;
    try {
      const decoded = jwtDecode<DecodedToken>(this.accessToken);
      return decoded.user_id || 0;
    } catch (error) {
      console.error('Failed to decode token', error);
      return 0;
    }
  }
}

export default AuthService.getInstance();