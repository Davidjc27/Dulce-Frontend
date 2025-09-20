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
    path: 'quienes-somos',
    loadComponent: () =>
      import('./pages/info-pages/about/about.component')
        .then(m => m.AboutPageComponent)
  },
  {
    path: 'sostenibilidad',
    loadComponent: () =>
      import('./pages/info-pages/sostenibilidad/sostenibilidad.component')
        .then(m => m.SostenibilidadPageComponent)
  },
  {
    path: 'tiendas',
    loadComponent: () =>
      import('./pages/info-pages/tiendas/tiendas.component')
        .then(m => m.TiendasPageComponent)
  },
  {
    path: 'preguntas-frecuentes',
    loadComponent: () =>
      import('./pages/info-pages/faq/faq.component')
        .then(m => m.FaqPageComponent)
  },
  {
    path: 'contactanos',
    loadComponent: () =>
      import('./pages/info-pages/contacto/contacto.component')
        .then(m => m.ContactoPageComponent)
  },
  {
    path: 'guia-de-tallas',
    loadComponent: () =>
      import('./pages/info-pages/guia-tallas/guia-tallas.component')
        .then(m => m.GuiaTallasPageComponent)
  },
  {
    path: 'cambios-y-devoluciones',
    loadComponent: () =>
      import('./pages/info-pages/cambios-devoluciones/cambios-devoluciones.component')
        .then(m => m.CambiosDevolucionesPageComponent)
  },
  {
    path: 'privacidad',
    loadComponent: () =>
      import('./pages/info-pages/privacidad/privacidad.component')
        .then(m => m.PrivacidadPageComponent)
  },
  {
    path: 'terminos-y-condiciones',
    loadComponent: () =>
      import('./pages/info-pages/terminos/terminos.component')
        .then(m => m.TerminosPageComponent)
  },
  {
    path: 'envios',
    loadComponent: () =>
      import('./pages/info-pages/envios/envios.component')
        .then(m => m.EnviosPageComponent)
  },
  {
    path: 'metodos-de-pago',
    loadComponent: () =>
      import('./pages/info-pages/metodos-pago/metodos-pago.component')
        .then(m => m.MetodosPagoPageComponent)
  },
  {
    path: 'puntos-y-beneficios',
    loadComponent: () =>
      import('./pages/info-pages/puntos-beneficios/puntos-beneficios.component')
        .then(m => m.PuntosBeneficiosPageComponent)
  },
{
  path: 'otras-solicitudes',
  loadComponent: () =>
    import('./pages/info-pages/otras-solicitudes/otras-solicitudes/otras-solicitudes.component')
      .then(m => m.OtrasSolicitudesPageComponent)
},
{
  path: 'consultar-estado-pqr',
  loadComponent: () =>
    import('./pages/info-pages/consultar-pqr/consultar-pqr/consultar-pqr.component')
      .then(m => m.ConsultarPqrPageComponent)
},
{
  path: 'garantias-y-devoluciones',
  loadComponent: () =>
    import('./pages/info-pages/garantias-devoluciones/garantias-devoluciones/garantias-devoluciones.component')
      .then(m => m.GarantiasDevolucionesPageComponent)
},
{
  path: 'localizador-de-tiendas',
  loadComponent: () =>
    import('./pages/info-pages/localizador-tiendas/localizador-tiendas/localizador-tiendas.component')
      .then(m => m.LocalizadorTiendasPageComponent)
},
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home')
        .then(m => m.HomeComponent)
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' }
];