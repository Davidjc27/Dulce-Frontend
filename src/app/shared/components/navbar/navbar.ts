import { AsyncPipe, Location } from '@angular/common';
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
   private readonly location = inject(Location);
  private readonly cartService = inject(CartService);
  readonly totalCartItems$ = this.cartService.totalQuantity$;

  // 👇 Estado del menú hamburguesa (móvil)
  isMobileMenuOpen = false;

  // 🔧 Si estás ya en /catalogo, fuerza recarga dura para que “resetee” correctamente
  private readonly FORCE_HARD_RELOAD_ON_CATALOG = true;

  constructor() {
    this.updateIsHome(this.router.url);

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(e => {
        this.updateIsHome(e.urlAfterRedirects);
        // Cierra el menú móvil al navegar
        this.closeMobileMenu();
        // Cierra cualquier dropdown abierto
        this.activeMenu = null;
      });
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
      // Forzar recarga dura (útil en GitHub Pages/baseHref)
      event.preventDefault();
      const tree = this.router.createUrlTree(['/catalogo'], { queryParams });
      const externalUrl = this.location.prepareExternalUrl(this.router.serializeUrl(tree));
      window.location.assign(externalUrl);
    } else {
      // Solo SPA (sin recargar): navega programáticamente
      event.preventDefault();
      void this.router.navigate(['/catalogo'], { queryParams, queryParamsHandling: '' });
    }
  }

  // ===== Menú / dropdowns =====
  onNavClick(): void { this.activeMenu = null; }
  openMenu(menuId: string): void { this.activeMenu = menuId; }
  closeMenu(menuId: string): void { if (this.activeMenu === menuId) this.activeMenu = null; }

  handleFocusOut(event: FocusEvent, menuId: string): void {
    const currentTarget = event.currentTarget as HTMLElement | null;
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    if (!currentTarget || (relatedTarget && currentTarget.contains(relatedTarget))) return;
    this.closeMenu(menuId);
  }

  @HostListener('document:keydown.escape') onEscape(): void { 
    this.activeMenu = null; 
    this.closeMobileMenu();
  }

  private updateIsHome(url: string): void { this.isHome = this.isHomeUrl(url); }
  private isHomeUrl(url: string): boolean {
    const [pathname] = (url ?? '').split('?');
    return pathname === '/home' || pathname === '/' || pathname === '';
  }

  // ===== Menú móvil (hamburguesa) =====
  toggleMobileMenu(): void { this.isMobileMenuOpen = !this.isMobileMenuOpen; }
  closeMobileMenu(): void { this.isMobileMenuOpen = false; }
}
