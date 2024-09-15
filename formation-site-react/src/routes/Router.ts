// src/routes/Router.ts

import { Route } from './routes';

// src/routes/Router.ts

export class Router {
  private routes: Route[];
  private setCurrentComponent: React.Dispatch<React.SetStateAction<React.ComponentType<any> | null>>;
  private basePath: string;

  constructor(
    routes: Route[], 
    setCurrentComponent: React.Dispatch<React.SetStateAction<React.ComponentType<any> | null>>,
    basePath: string
  ) {
    this.routes = routes;
    this.setCurrentComponent = setCurrentComponent;
    this.basePath = basePath;
    this.handlePopState = this.handlePopState.bind(this);
  }

  public init() {
    window.addEventListener('popstate', this.handlePopState);
    this.handlePopState();
  }

  public cleanup() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  private handlePopState() {
    const fullPath = window.location.pathname;
    const path = fullPath.replace(this.basePath, '') || '/';
    const route = this.findMatchingRoute(path);
    if (route) {
      this.setCurrentComponent(() => route.component);
    } else {
      console.error(`No route found for path: ${fullPath}`);
    }
  }

  public navigate(path: string) {
    const fullPath = `${this.basePath}${path}`;
    window.history.pushState(null, '', fullPath);
    this.handlePopState();
  }

  public findMatchingRoute(path: string): Route | undefined {
    return this.routes.find(route => {
      if (route.exact) {
        return route.path === path;
      }
      const routeParts = route.path.split('/');
      const pathParts = path.split('/');
      if (routeParts.length !== pathParts.length) return false;
      return routeParts.every((part, i) => part === pathParts[i] || part.startsWith(':'));
    });
  }
}