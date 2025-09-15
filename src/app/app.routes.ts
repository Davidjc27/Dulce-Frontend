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
        .then(m => m.CatalogoListComponent)
  },
  {
    path: 'carrito',
    loadComponent: () =>
      import('./features/carrito/pages/carrito-list/carrito-list')
        .then(m => m.CarritoListComponent)
  },
  { path: '**', redirectTo: 'catalogo' }
];
