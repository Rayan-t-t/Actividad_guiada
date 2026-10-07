import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'inicio',
    loadComponent: () =>
      import('./pages/inicio/inicio.page').then((m) => m.InicioPage),
  },
  {
    path: 'productos',
    loadComponent: () =>
      import('./pages/products/products.page').then((m) => m.ProductosPage),
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'inicio',
  },
];
