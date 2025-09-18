import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/pages/checkout-form/checkout-form.component')
        .then(m => m.CheckoutFormComponent)
  },
  {
    path: 'catalogo',
    loadComponent: () =>
      import('./features/catalogo/pages/catalogo-list/catalogo-list.component')
        .then(m => m.default)
  },
  {
    path: 'carrito',
    loadComponent: () =>
      import('./features/carrito/pages/carrito-list/carrito-list')
        .then(m => m.CarritoListComponent)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home')
        .then(m => m.HomeComponent)
  },
  { path: '**', redirectTo: 'home' }
];