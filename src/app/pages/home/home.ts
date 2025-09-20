import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { NgFor, CurrencyPipe, NgIf } from '@angular/common';
import { Params, Router, UrlTree } from '@angular/router';
import { CatalogNavigationService } from '../../features/catalogo/pages/catalogo-list/services/catalog-navigation.service';

interface Product {
  name: string;
  price: number;
  image: string;
  filter: Params;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, CurrencyPipe, NgIf],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroVideoEl') heroVideoEl?: ElementRef<HTMLVideoElement>;

  readonly spotlightFilters = {
    novedadesDama: { categories: 'Dama', sort: 'newest' },
    novedadesNina: { categories: 'Niña', sort: 'newest' }
  } as const;

  readonly products: Product[] = [
    {
      name: 'Camisas Dama',
      price: 59.99,
      image: 'https://picsum.photos/seed/camisasdama/300/400',
      filter: { categories: 'Dama', subCategories: 'Camisetas' }
    },
    {
      name: 'Blusas Dama',
      price: 120,
      image: 'https://picsum.photos/seed/blusasdama/300/400',
      filter: { categories: 'Dama', subCategories: 'Blusas' }
    },
    {
      name: 'Cardigans',
      price: 70.5,
      image: 'https://picsum.photos/seed/cardigans/300/400',
      filter: { categories: 'Dama', subCategories: 'Cardigans' }
    },
    {
      name: 'Pijamas Dama',
      price: 59.99,
      image: 'https://picsum.photos/seed/camisasnina/300/400',
      filter: { categories: 'Dama', subCategories: 'Pijamas' }
    },
    {
      name: 'Leggins Dama',
      price: 120,
      image: 'https://picsum.photos/seed/conjuntosnina/300/400',
      filter: { categories: 'Dama', subCategories: 'Leggins' }
    },
    {
      name: 'Busos Niña',
      price: 70.5,
      image: 'https://picsum.photos/seed/busosnina/300/400',
      filter: { categories: 'Niña', subCategories: 'Busos' }
    },
    {
      name: 'Leggins Niña',
      price: 59.99,
      image: 'https://picsum.photos/seed/legginsnina/300/400',
      filter: { categories: 'Niña', subCategories: 'Leggins' }
    },
    {
      name: 'Pijamas Niña',
      price: 120,
      image: 'https://picsum.photos/seed/pijamasdama/300/400',
      filter: { categories: 'Niña', subCategories: 'Pijamas' }
    },
    {
      name: 'Camisas Niña',
      price: 70.5,
      image: 'https://picsum.photos/seed/pijamasdama2/300/400',
      filter: { categories: 'Niña', subCategories: 'Camisetas' }
    },
    {
      name: 'Conjuntos Niña',
      price: 59.99,
      image: 'https://picsum.photos/seed/legginsdama/300/400',
      filter: { categories: 'Niña', subCategories: 'Conjuntos' }
    }
  ];

  showBrandReveal = false;
  private brandRevealTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly router: Router,
    private readonly catalogNavigation: CatalogNavigationService
  ) {}

  ngAfterViewInit() {
    const video = this.heroVideoEl?.nativeElement;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.setAttribute('fetchpriority', 'high');

    const tryPlay = async () => {
      try {
        if (video.paused) {
          await video.play();
        }
      } catch {
        // Ignorar errores de autoplay; el usuario podrá iniciar el video manualmente.
      }
    };

    const handleReady = () => {
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('canplay', handleReady);
      void tryPlay();
    };

    if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
      handleReady();
    } else {
      video.addEventListener('loadeddata', handleReady);
      video.addEventListener('canplay', handleReady);
      video.load();
    }

    void tryPlay();

    this.brandRevealTimeoutId = setTimeout(() => {
      this.showBrandReveal = true;
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.brandRevealTimeoutId !== null) {
      clearTimeout(this.brandRevealTimeoutId);
    }
  }

  navigateToCatalog(event: Event, overrides: Params): void {
    if (this.shouldLetBrowserHandle(event)) {
      return;
    }

    event.preventDefault();

    const target = this.buildCatalogTarget(overrides);
    this.catalogNavigation.trigger(target.queryParams);

    if (this.isBrowser()) {
      window.location.assign(target.href);
      return;
    }

    void this.router.navigateByUrl(target.urlTree);
  }

  buildCatalogHref(overrides: Params): string {
    return this.buildCatalogTarget(overrides).href;
  }

  private resetParams(overrides: Params): Params {
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

  private buildCatalogTarget(overrides: Params): {
    queryParams: Params;
    urlTree: UrlTree;
    href: string;
  } {
    const queryParams = this.resetParams(overrides);
    const urlTree = this.router.createUrlTree(['/catalogo'], {
      queryParams
    });
    const href = this.router.serializeUrl(urlTree);

    return { queryParams, urlTree, href };
  }

  private shouldLetBrowserHandle(event: Event): boolean {
    if (event instanceof MouseEvent) {
      return event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey;
    }

    if (event instanceof KeyboardEvent) {
      return event.ctrlKey || event.metaKey || event.shiftKey || event.altKey;
    }

    return false;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.location !== 'undefined';
  }
}