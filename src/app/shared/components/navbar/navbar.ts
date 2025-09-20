import { NgIf } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouterLink,
  Params,
} from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  readonly catalogFilters = {
    promotions: { priceMax: 800, sort: 'priceAsc' },
    newest: { sort: 'newest' },
    dama: { categories: 'Dama' },
    nina: { categories: 'Niña' },
    damaPijamas: { categories: 'Dama', colors: 'Rosa' },
    damaBlusas: { categories: 'Dama', colors: 'Blanco' },
    damaCamisetas: { categories: 'Dama', colors: 'Azul' },
    damaLeggins: { categories: 'Dama', colors: 'Negro' },
    ninaPijamas: { categories: 'Niña', colors: 'Rosa' },
    ninaBlusas: { categories: 'Niña', colors: 'Morado' },
    ninaCamisetas: { categories: 'Niña', colors: 'Azul' },
    ninaLeggins: { categories: 'Niña', colors: 'Verde' },
    acceso: { priceMin: 900, sort: 'priceDesc' }
  } as const;

  activeMenu: string | null = null;
  isHome = false;

  private readonly router = inject(Router);

  constructor() {
    // estado inicial
    this.updateIsHome(this.router.url);

    // reactivo a cambios de ruta
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(event => {
        this.updateIsHome(event.urlAfterRedirects);
      });
  }

  /** Resetea todos los filtros y aplica solo los overrides del item clicado */
  resetParams(overrides: Params): Params {
    return {
      // limpia todo lo que usa el catálogo
      categories: null,
      sizes: null,
      colors: null,
      priceMin: null,
      priceMax: null,
      sort: null,
      page: null,
      // aplica solo el filtro elegido
      ...overrides
    };
  }

  /** Cierra el dropdown después del click en un item del menú */
  onNavClick(): void {
    this.activeMenu = null;
  }

  openMenu(menuId: string): void {
    this.activeMenu = menuId;
  }

  closeMenu(menuId: string): void {
    if (this.activeMenu === menuId) {
      this.activeMenu = null;
    }
  }

  handleFocusOut(event: FocusEvent, menuId: string): void {
    const currentTarget = event.currentTarget as HTMLElement | null;
    const relatedTarget = event.relatedTarget as HTMLElement | null;

    if (!currentTarget || (relatedTarget && currentTarget.contains(relatedTarget))) {
      return;
    }
    this.closeMenu(menuId);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.activeMenu = null;
  }

  private updateIsHome(url: string): void {
    this.isHome = this.isHomeUrl(url);
  }

  private isHomeUrl(url: string): boolean {
    const [pathname] = (url ?? '').split('?');
    return pathname === '/home' || pathname === '/' || pathname === '';
  }
}
