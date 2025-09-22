import { AsyncPipe } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router, NavigationEnd, RouterLink, Params } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  readonly catalogFilters = {
    promotions: { priceMax: 800, sort: 'priceAsc' },
    newest: { sort: 'newest' },
    dama: { categories: 'Dama' },
    nina: { categories: 'Niña' },
    damaPijamas: { categories: 'Dama', subCategories: 'Pijamas' },
    damaBlusas: { categories: 'Dama', subCategories: 'Blusas' },
    damaCamisetas: { categories: 'Dama', subCategories: 'Camisetas' },
    damaLeggins: { categories: 'Dama', subCategories: 'Leggins' },
    ninaPijamas: { categories: 'Niña', subCategories: 'Pijamas' },
    ninaBlusas: { categories: 'Niña', subCategories: 'Blusas' },
    ninaCamisetas: { categories: 'Niña', subCategories: 'Camisetas' },
    ninaLeggins: { categories: 'Niña', subCategories: 'Leggins' }
  } as const;

  activeMenu: string | null = null;
  isHome = false;

  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  readonly totalCartItems$ = this.cartService.totalQuantity$;

  // 🔧 Cambia a true si quieres forzar recarga dura cuando ya estés en /catalogo
  private readonly FORCE_HARD_RELOAD_ON_CATALOG = true;

  constructor() {
    this.updateIsHome(this.router.url);
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(e => this.updateIsHome(e.urlAfterRedirects));
  }

  /** Limpia todos los filtros y aplica overrides */
  resetParams(overrides: Params): Params {
    return {
      categories: null,
      subCategories: null,
      sizes: null,
      colors: null,
      priceMin: null,
      priceMax: null,
      sort: null,
      page: null,
      ...overrides
    };
  }

  buildCatalogParams(overrides: Params): Params {
    return this.resetParams(overrides);
  }

  /** Click en links del catálogo */
  onCatalogLinkClick(event: Event, overrides: Params): void {
    this.onNavClick();

    const queryParams = this.resetParams(overrides);

    // Si NO estás en /catalogo, deja que routerLink navegue normal (SPA)
    if (!this.router.url.startsWith('/catalogo')) return;

    // Si estás en /catalogo:
    if (this.FORCE_HARD_RELOAD_ON_CATALOG) {
      // Forzar recarga dura (GitHub Pages/baseHref incluidos)
      event.preventDefault();
      const tree = this.router.createUrlTree(['/catalogo'], { queryParams });
      const url = this.router.serializeUrl(tree);
      window.location.assign(url); // 🔁 recarga toda la página
    } else {
      // Solo SPA (sin recargar): navega programáticamente
      event.preventDefault();
      void this.router.navigate(['/catalogo'], { queryParams, queryParamsHandling: '' });
    }
  }

  onNavClick(): void { this.activeMenu = null; }
  openMenu(menuId: string): void { this.activeMenu = menuId; }
  closeMenu(menuId: string): void { if (this.activeMenu === menuId) this.activeMenu = null; }

  handleFocusOut(event: FocusEvent, menuId: string): void {
    const currentTarget = event.currentTarget as HTMLElement | null;
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    if (!currentTarget || (relatedTarget && currentTarget.contains(relatedTarget))) return;
    this.closeMenu(menuId);
  }

  @HostListener('document:keydown.escape') onEscape(): void { this.activeMenu = null; }

  private updateIsHome(url: string): void { this.isHome = this.isHomeUrl(url); }
  private isHomeUrl(url: string): boolean {
    const [pathname] = (url ?? '').split('?');
    return pathname === '/home' || pathname === '/' || pathname === '';
  }
}
