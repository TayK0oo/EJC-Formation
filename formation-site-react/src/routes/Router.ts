// src/routes/Router.ts

import { Route } from './routes';

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
    window.history.pushState(null, '', path);
    this.handlePopState();
  }

  private handlePopState() {
    const path = window.location.pathname;
    const route = this.findMatchingRoute(path);
    if (route) {
      this.setCurrentComponent(() => route.component);
    } else {
      console.error(`No route found for path: ${path}`);
    }
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