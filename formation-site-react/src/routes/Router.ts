// src/routes/Router.ts


import { Route } from './routes';
import Error404 from '../pages/Error404';

export const BASE_PATH = '';

export class Router {
  private routes: Route[];
  private setCurrentComponent: React.Dispatch<React.SetStateAction<React.ComponentType<any> | null>>;

  constructor(routes: Route[], setCurrentComponent: React.Dispatch<React.SetStateAction<React.ComponentType<any> | null>>) {
    this.routes = routes;
    this.setCurrentComponent = setCurrentComponent;
    this.handlePopState = this.handlePopState.bind(this);
  }

  public init() {
    window.addEventListener('popstate', this.handlePopState);
    this.handlePopState();
  }

  public cleanup() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  public navigate(path: string) {
    const fullPath = `${BASE_PATH}${path}`;
    window.history.pushState(null, '', fullPath);
    this.handlePopState();
  }

  private handlePopState() {
    const path = window.location.pathname;
    const route = this.findMatchingRoute(path);
    console.log('route', route);
    console.log('path', path);
    if (route) {
      this.setCurrentComponent(() => route.component);
    } else {
      // Rediriger vers une page 404 ou une page par défaut
      this.setCurrentComponent(() => Error404);
    }
  }

  

  public findMatchingRoute(path: string): Route | undefined {
    const trimmedPath = path.startsWith(BASE_PATH) ? path.slice(BASE_PATH.length) : path;
    console.log('trimmedPath', trimmedPath);
    
    return this.routes.find(route => {
      if (route.exact) {
        return route.path === trimmedPath;
      }
      const regexPath = '^' + route.path.replace(/:\w+/g, '([^/]+)') + '$';
      return new RegExp(regexPath).test(trimmedPath);
    });
  }
}