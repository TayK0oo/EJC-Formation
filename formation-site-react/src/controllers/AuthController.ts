import { Observable, from, lastValueFrom } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import AuthService from '../services/AuthService';

class AuthController {
  login(username: string, password: string): Observable<boolean> {
    return AuthService.login(username, password).pipe(
      map(() => true),
      catchError((error) => {
        console.error('Login failed', error);
        return from(Promise.resolve(false));
      })
    );
  }

  register(username: string, email: string, password: string): Observable<boolean> {
    return AuthService.register(username, email, password).pipe(
      map(() => true),
      catchError((error) => {
        if (error == 'DoubleRequest') {
          return from(Promise.resolve(true));
        }
        console.error('Registration failed', error);
        return from(Promise.resolve(false));
      })
    );
  }

  loginWithGoogle(): Observable<boolean> {
    return from(Promise.reject(new Error('Google login not implemented')));
  }

  logout(): void {
    AuthService.logout();
  }

  isAuthenticated(): boolean {
    return AuthService.isAuthenticated();
  }

  getUserCourses(): Observable<any[]> {
    return AuthService.getUserCourses();
  }

  async loginAsync(username: string, password: string): Promise<boolean> {
    return await lastValueFrom(this.login(username, password));
  }

  async registerAsync(username: string, email: string, password: string): Promise<boolean> {
    return await lastValueFrom(this.register(username, email, password));
  }

  async getUserCoursesAsync(): Promise<any[]> {
    return await lastValueFrom(this.getUserCourses());
  }
}

export default new AuthController();