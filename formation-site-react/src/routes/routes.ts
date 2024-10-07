// src/routes/routes.ts

import HomePage from '../pages/HomePage';
import FormationDetailPage from '../pages/formations/[id]';
import TestPage from '../pages/TestPage';

export interface Route {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
}

export const routes: Route[] = [
  { path: '/', component: HomePage, exact: true },
  { path: '/formations/:id', component: FormationDetailPage },
  { path: '/test', component: TestPage }
];