import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type Category = 'Dama' | 'Niña';
type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | '4' | '6' | '8' | '10' | '12' | '14';
type Color = 'Negro' | 'Blanco' | 'Azul' | 'Rojo' | 'Verde' | 'Amarillo' | 'Morado' | 'Rosa';
type SortOptionValue = 'relevance' | 'priceAsc' | 'priceDesc' | 'newest';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  size: Size;
  color: Color;
  createdAt: string;
}

interface FilterChip {
  type: 'categories' | 'sizes' | 'colors' | 'price';
  value: string;
  label: string;
}

interface StoredFiltersState {
  categories: Category[];
  sizes: Size[];
  colors: Color[];
  priceMin: number | null;
  priceMax: number | null;
  sort: SortOptionValue;
  page: number;
}

@Component({
  selector: 'app-catalogo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './catalogo-list.html',
  styleUrls: ['./catalogo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CatalogoListComponent implements OnInit, OnDestroy {
  private static readonly STORAGE_KEY = 'catalogo_filters_state';

  @ViewChild('filtersButtonRef')
  private filtersButton?: ElementRef<HTMLButtonElement>;

  readonly categoryOptions: Category[] = ['Dama', 'Niña'];
  readonly sizeOptions: Size[] = ['XS', 'S', 'M', 'L', 'XL', '4', '6', '8', '10', '12', '14'];
  readonly colorOptions: Color[] = ['Negro', 'Blanco', 'Azul', 'Rojo', 'Verde', 'Amarillo', 'Morado', 'Rosa'];
  readonly sortOptions: { value: SortOptionValue; label: string }[] = [
    { value: 'relevance', label: 'Relevancia' },
    { value: 'priceAsc', label: 'Precio ↑' },
    { value: 'priceDesc', label: 'Precio ↓' },
    { value: 'newest', label: 'Novedades' }
  ];

  readonly filtersForm = new FormGroup({
    categories: new FormControl<Category[]>([], { nonNullable: true }),
    sizes: new FormControl<Size[]>([], { nonNullable: true }),
    colors: new FormControl<Color[]>([], { nonNullable: true }),
    priceMin: new FormControl<number | null>(null),
    priceMax: new FormControl<number | null>(null),
    sort: new FormControl<SortOptionValue>('relevance', { nonNullable: true })
  });

  readonly allProducts: Product[] = [
    {
      id: 'p-001',
      name: 'Vestido satinado verde',
      price: 1299,
      image: 'assets/img/hero-poster.jpg',
      category: 'Dama',
      size: 'M',
      color: 'Verde',
      createdAt: '2024-03-15T10:00:00Z'
    },
    {
      id: 'p-002',
      name: 'Blusa de encaje negra',
      price: 749,
      image: 'assets/img/hero-poster.jpg',
      category: 'Dama',
      size: 'S',
      color: 'Negro',
      createdAt: '2024-02-28T15:30:00Z'
    },
    {
      id: 'p-003',
      name: 'Conjunto casual rojo',
      price: 899,
      image: 'assets/img/hero-poster.jpg',
      category: 'Dama',
      size: 'L',
      color: 'Rojo',
      createdAt: '2024-01-22T09:15:00Z'
    },
    {
      id: 'p-004',
      name: 'Chamarra denim clásica',
      price: 1199,
      image: 'assets/img/hero-poster.jpg',
      category: 'Dama',
      size: 'XL',
      color: 'Azul',
      createdAt: '2023-12-10T12:00:00Z'
    },
    {
      id: 'p-005',
      name: 'Vestido blanco floral',
      price: 1099,
      image: 'assets/img/hero-poster.jpg',
      category: 'Dama',
      size: 'XS',
      color: 'Blanco',
      createdAt: '2024-04-04T18:45:00Z'
    },
    {
      id: 'p-006',
      name: 'Suéter amarillo suave',
      price: 659,
      image: 'assets/img/hero-poster.jpg',
      category: 'Dama',
      size: 'M',
      color: 'Amarillo',
      createdAt: '2024-02-12T08:10:00Z'
    },
    {
      id: 'p-007',
      name: 'Vestido tutú rosa',
      price: 549,
      image: 'assets/img/hero-poster.jpg',
      category: 'Niña',
      size: '6',
      color: 'Rosa',
      createdAt: '2024-03-28T16:20:00Z'
    },
    {
      id: 'p-008',
      name: 'Conjunto morado brillante',
      price: 599,
      image: 'assets/img/hero-poster.jpg',
      category: 'Niña',
      size: '8',
      color: 'Morado',
      createdAt: '2024-01-30T11:35:00Z'
    },
    {
      id: 'p-009',
      name: 'Chaqueta azul deportiva',
      price: 689,
      image: 'assets/img/hero-poster.jpg',
      category: 'Niña',
      size: '10',
      color: 'Azul',
      createdAt: '2023-11-18T14:05:00Z'
    },
    {
      id: 'p-010',
      name: 'Conjunto verde bosque',
      price: 639,
      image: 'assets/img/hero-poster.jpg',
      category: 'Niña',
      size: '12',
      color: 'Verde',
      createdAt: '2023-12-27T19:00:00Z'
    },
    {
      id: 'p-011',
      name: 'Vestido rojo festivo',
      price: 719,
      image: 'assets/img/hero-poster.jpg',
      category: 'Niña',
      size: '14',
      color: 'Rojo',
      createdAt: '2024-03-08T20:10:00Z'
    },
    {
      id: 'p-012',
      name: 'Blazer rosa pastel',
      price: 1349,
      image: 'assets/img/hero-poster.jpg',
      category: 'Dama',
      size: 'M',
      color: 'Rosa',
      createdAt: '2024-04-12T07:50:00Z'
    },
    {
      id: 'p-013',
      name: 'Falda plisada morada',
      price: 799,
      image: 'assets/img/hero-poster.jpg',
      category: 'Dama',
      size: 'S',
      color: 'Morado',
      createdAt: '2024-02-02T13:00:00Z'
    },
    {
      id: 'p-014',
      name: 'Conjunto sport blanco',
      price: 899,
      image: 'assets/img/hero-poster.jpg',
      category: 'Dama',
      size: 'L',
      color: 'Blanco',
      createdAt: '2023-10-21T09:40:00Z'
    },
    {
      id: 'p-015',
      name: 'Abrigo negro elegante',
      price: 1599,
      image: 'assets/img/hero-poster.jpg',
      category: 'Dama',
      size: 'XL',
      color: 'Negro',
      createdAt: '2024-01-12T17:25:00Z'
    },
    {
      id: 'p-016',
      name: 'Vestido azul marino',
      price: 989,
      image: 'assets/img/hero-poster.jpg',
      category: 'Dama',
      size: 'M',
      color: 'Azul',
      createdAt: '2024-03-02T10:55:00Z'
    }
  ];

  readonly itemsPerPage = 9;
  page = 1;
  totalPages = 1;
  filteredProducts: Product[] = [];
  pagedProducts: Product[] = [];
  appliedChips: FilterChip[] = [];
  isFiltersOpen = false;

  private initialQueryApplied = false;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe(paramMap => {
      if (!this.initialQueryApplied && !this.hasQueryParams(paramMap)) {
        const storedState = this.loadStateFromStorage();
        if (storedState) {
          this.applyStoredState(storedState);
          this.initialQueryApplied = true;
          this.syncQueryFromForm();
          this.filterProducts();
          return;
        }
      }

      this.initialQueryApplied = true;
      this.syncFormFromQuery(paramMap);
      this.filterProducts();
    });
  }

  ngOnDestroy(): void {
    this.enableBodyScroll();
  }

  applyFilters(): void {
    this.page = 1;
    this.syncQueryFromForm();
    this.filterProducts();
  }

  clearFilters(): void {
    this.filtersForm.setValue({
      categories: [],
      sizes: [],
      colors: [],
      priceMin: null,
      priceMax: null,
      sort: 'relevance'
    });
    this.applyFilters();
  }

  onCheckboxChange(
    controlName: 'categories' | 'sizes' | 'colors',
    value: string,
    checked: boolean
  ): void {
    const control = this.filtersForm.get(controlName) as FormControl<string[]>;
    const current = [...(control.value ?? [])];
    if (checked) {
      if (!current.includes(value)) {
        current.push(value);
      }
    } else {
      const index = current.indexOf(value);
      if (index !== -1) {
        current.splice(index, 1);
      }
    }
    control.setValue(current as never);
    this.applyFilters();
  }

  onSortChange(): void {
    this.page = 1;
    this.syncQueryFromForm();
    this.filterProducts();
  }

  onPriceChange(): void {
    this.applyFilters();
  }

  removeFilterChip(chip: FilterChip): void {
    switch (chip.type) {
      case 'categories':
      case 'sizes':
      case 'colors': {
        const control = this.filtersForm.get(chip.type) as FormControl<string[]>;
        const updated = (control.value ?? []).filter(value => value !== chip.value);
        control.setValue(updated as never);
        break;
      }
      case 'price':
        this.filtersForm.patchValue({ priceMin: null, priceMax: null });
        break;
    }
    this.applyFilters();
  }

  goToPreviousPage(): void {
    if (this.page > 1) {
      this.page -= 1;
      this.syncQueryFromForm();
      this.updatePagination();
    }
  }

  goToNextPage(): void {
    if (this.page < this.totalPages) {
      this.page += 1;
      this.syncQueryFromForm();
      this.updatePagination();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.page) {
      this.page = page;
      this.syncQueryFromForm();
      this.updatePagination();
    }
  }

  openFilters(): void {
    this.isFiltersOpen = true;
    this.disableBodyScroll();
  }

  closeFilters(): void {
    this.isFiltersOpen = false;
    this.enableBodyScroll();
    queueMicrotask(() => this.filtersButton?.nativeElement.focus());
  }

  trackById(_index: number, product: Product): string {
    return product.id;
  }

  trackByChip(_index: number, chip: FilterChip): string {
    return `${chip.type}-${chip.value}`;
  }

  private filterProducts(): void {
    const { categories, sizes, colors, priceMin, priceMax, sort } = this.filtersForm.getRawValue();
    let result = [...this.allProducts];

    if (categories.length) {
      result = result.filter(product => categories.includes(product.category));
    }

    if (sizes.length) {
      result = result.filter(product => sizes.includes(product.size));
    }

    if (colors.length) {
      result = result.filter(product => colors.includes(product.color));
    }

    if (priceMin !== null) {
      result = result.filter(product => product.price >= priceMin);
    }

    if (priceMax !== null) {
      result = result.filter(product => product.price <= priceMax);
    }

    result = this.sortProducts(result, sort);

    this.filteredProducts = result;
    this.updateAppliedChips();
    this.updatePagination();
    this.saveStateToStorage({
      categories,
      sizes,
      colors,
      priceMin,
      priceMax,
      sort,
      page: this.page
    });
    this.cdr.markForCheck();
  }

  private sortProducts(products: Product[], sort: SortOptionValue): Product[] {
    switch (sort) {
      case 'priceAsc':
        return [...products].sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return [...products].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...products].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return [...products];
    }
  }

  private updatePagination(): void {
    const total = this.filteredProducts.length;
    this.totalPages = total > 0 ? Math.ceil(total / this.itemsPerPage) : 1;

    if (this.page > this.totalPages) {
      this.page = this.totalPages;
    }

    if (this.page < 1) {
      this.page = 1;
    }

     const startIndex = (this.page - 1) * this.itemsPerPage;
    this.pagedProducts = this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
    this.cdr.markForCheck();
  }

  private updateAppliedChips(): void {
    const chips: FilterChip[] = [];
    const { categories, sizes, colors, priceMin, priceMax } = this.filtersForm.getRawValue();

    categories.forEach(category => {
      chips.push({ type: 'categories', value: category, label: category });
    });

    sizes.forEach(size => {
      chips.push({ type: 'sizes', value: size, label: `Talla ${size}` });
    });

    colors.forEach(color => {
      chips.push({ type: 'colors', value: color, label: color });
    });

    if (priceMin !== null || priceMax !== null) {
      const minLabel = priceMin !== null ? `$${priceMin}` : 'Min';
      const maxLabel = priceMax !== null ? `$${priceMax}` : 'Max';
      chips.push({
        type: 'price',
        value: `${priceMin ?? ''}-${priceMax ?? ''}`,
        label: `Precio: ${minLabel} - ${maxLabel}`
      });
    }

    this.appliedChips = chips;
  }

  private syncFormFromQuery(paramMap: ParamMap): void {
    const categories = this.getQueryArray<Category>(paramMap, 'categories', this.categoryOptions);
    const sizes = this.getQueryArray<Size>(paramMap, 'sizes', this.sizeOptions);
    const colors = this.getQueryArray<Color>(paramMap, 'colors', this.colorOptions);

    const priceMinParam = this.parseNumber(paramMap.get('priceMin'));
    const priceMaxParam = this.parseNumber(paramMap.get('priceMax'));

    const sortParam = paramMap.get('sort') as SortOptionValue | null;
    const sort = this.sortOptions.some(option => option.value === sortParam) ? sortParam! : 'relevance';

    const pageParam = this.parseNumber(paramMap.get('page'));
    this.page = pageParam !== null && pageParam > 0 ? Math.floor(pageParam) : 1;

    this.filtersForm.setValue({
      categories,
      sizes,
      colors,
      priceMin: priceMinParam,
      priceMax: priceMaxParam,
      sort
    });
  }

  private syncQueryFromForm(): void {
    const { categories, sizes, colors, priceMin, priceMax, sort } = this.filtersForm.getRawValue();
    const queryParams: Params = {
      categories: categories.length ? categories.join(',') : null,
      sizes: sizes.length ? sizes.join(',') : null,
      colors: colors.length ? colors.join(',') : null,
      priceMin: priceMin !== null ? priceMin : null,
      priceMax: priceMax !== null ? priceMax : null,
      sort: sort !== 'relevance' ? sort : null,
      page: this.page > 1 ? this.page : null
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      replaceUrl: true
    });
  }

  private hasQueryParams(paramMap: ParamMap): boolean {
    return paramMap.keys.some(key => paramMap.get(key) !== null && paramMap.get(key) !== '');
  }

  private applyStoredState(state: StoredFiltersState): void {
    this.filtersForm.setValue({
      categories: this.filterAllowedValues(state.categories, this.categoryOptions),
      sizes: this.filterAllowedValues(state.sizes, this.sizeOptions),
      colors: this.filterAllowedValues(state.colors, this.colorOptions),
      priceMin: state.priceMin,
      priceMax: state.priceMax,
      sort: this.sortOptions.some(option => option.value === state.sort) ? state.sort : 'relevance'
    });
    this.page = state.page > 0 ? Math.floor(state.page) : 1;
  }

  private loadStateFromStorage(): StoredFiltersState | null {
    if (!this.isBrowser()) {
      return null;
    }

    try {
      const raw = window.localStorage.getItem(CatalogoListComponent.STORAGE_KEY);
      if (!raw) {
        return null;
      }

      const parsed = JSON.parse(raw) as Partial<StoredFiltersState>;
      return {
        categories: this.filterAllowedValues(parsed.categories ?? [], this.categoryOptions),
        sizes: this.filterAllowedValues(parsed.sizes ?? [], this.sizeOptions),
        colors: this.filterAllowedValues(parsed.colors ?? [], this.colorOptions),
        priceMin: this.parseNumber(parsed.priceMin),
        priceMax: this.parseNumber(parsed.priceMax),
        sort: this.sortOptions.some(option => option.value === parsed.sort) ? parsed.sort! : 'relevance',
        page:
          typeof parsed.page === 'number' && Number.isFinite(parsed.page) && parsed.page > 0
            ? Math.floor(parsed.page)
            : 1
      };
    } catch (error) {
      console.error('Error al cargar filtros del catálogo', error);
      return null;
    }
  }

  private saveStateToStorage(state: StoredFiltersState): void {
    if (!this.isBrowser()) {
      return;
    }

    try {
      window.localStorage.setItem(
        CatalogoListComponent.STORAGE_KEY,
        JSON.stringify({ ...state, page: this.page })
      );
    } catch (error) {
      console.error('Error al guardar filtros del catálogo', error);
    }
  }

  private getQueryArray<T extends string>(paramMap: ParamMap, key: string, allowed: readonly T[]): T[] {
    const multi = paramMap.getAll(key);
    const values = multi.length ? multi : (paramMap.get(key)?.split(',') ?? []);
    return values
      .map(value => value.trim())
      .filter((value): value is T => (allowed as readonly string[]).includes(value));
  }

  private filterAllowedValues<T extends string>(values: unknown, allowed: readonly T[]): T[] {
    if (!Array.isArray(values)) {
      return [];
    }
    return values
      .map(value => `${value}`.trim())
      .filter((value): value is T => (allowed as readonly string[]).includes(value));
  }

  private parseNumber(value: unknown): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private disableBodyScroll(): void {
    if (this.isBrowser()) {
      document.body.style.overflow = 'hidden';
    }
  }

  private enableBodyScroll(): void {
    if (this.isBrowser()) {
      document.body.style.removeProperty('overflow');
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
  }
}