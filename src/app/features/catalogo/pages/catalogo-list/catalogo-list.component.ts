import {
  AfterViewInit,
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
import { startWith } from 'rxjs';

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
export default class CatalogoListComponent implements OnInit, OnDestroy, AfterViewInit {
  private static readonly STORAGE_KEY = 'catalogo_filters_state';

  @ViewChild('filtersButtonRef')
  private filtersButton?: ElementRef<HTMLButtonElement>;

  @ViewChild('productsGrid')
  private productsGridRef?: ElementRef<HTMLElement>;

  private isBootstrapping = true;  

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
      image: 'https://picsum.photos/seed/camisasdama-001/300/400',
      category: 'Dama',
      size: 'M',
      color: 'Verde',
      createdAt: '2024-03-15T10:00:00Z'
    },
    {
      id: 'p-002',
      name: 'Blusa de encaje negra',
      price: 749,
      image: 'https://picsum.photos/seed/camisasdama-002/300/400',
      category: 'Dama',
      size: 'S',
      color: 'Negro',
      createdAt: '2024-02-28T15:30:00Z'
    },
    {
      id: 'p-003',
      name: 'Conjunto casual rojo',
      price: 899,
      image: 'https://picsum.photos/seed/camisasdama-003/300/400',
      category: 'Dama',
      size: 'L',
      color: 'Rojo',
      createdAt: '2024-01-22T09:15:00Z'
    },
    {
      id: 'p-004',
      name: 'Chamarra denim clásica',
      price: 1199,
      image: 'https://picsum.photos/seed/camisasdama-004/300/400',
      category: 'Dama',
      size: 'XL',
      color: 'Azul',
      createdAt: '2023-12-10T12:00:00Z'
    },
    {
      id: 'p-005',
      name: 'Vestido blanco floral',
      price: 1099,
      image: 'https://picsum.photos/seed/camisasdama-005/300/400',
      category: 'Dama',
      size: 'XS',
      color: 'Blanco',
      createdAt: '2024-04-04T18:45:00Z'
    },
    {
      id: 'p-006',
      name: 'Suéter amarillo suave',
      price: 659,
      image: 'https://picsum.photos/seed/camisasdama-006/300/400',
      category: 'Dama',
      size: 'M',
      color: 'Amarillo',
      createdAt: '2024-02-12T08:10:00Z'
    },
    {
      id: 'p-007',
      name: 'Vestido tutú rosa',
      price: 549,
      image: 'https://picsum.photos/seed/camisasdama-007/300/400',
      category: 'Niña',
      size: '6',
      color: 'Rosa',
      createdAt: '2024-03-28T16:20:00Z'
    },
    {
      id: 'p-008',
      name: 'Conjunto morado brillante',
      price: 599,
      image: 'https://picsum.photos/seed/camisasdama-008/300/400',
      category: 'Niña',
      size: '8',
      color: 'Morado',
      createdAt: '2024-01-30T11:35:00Z'
    },
    {
      id: 'p-009',
      name: 'Chaqueta azul deportiva',
      price: 689,
      image: 'https://picsum.photos/seed/camisasdama-009/300/400',
      category: 'Niña',
      size: '10',
      color: 'Azul',
      createdAt: '2023-11-18T14:05:00Z'
    },
    {
      id: 'p-010',
      name: 'Conjunto verde bosque',
      price: 639,
      image: 'https://picsum.photos/seed/camisasdama-010/300/400',
      category: 'Niña',
      size: '12',
      color: 'Verde',
      createdAt: '2023-12-27T19:00:00Z'
    },
    {
      id: 'p-011',
      name: 'Vestido rojo festivo',
      price: 719,
      image: 'https://picsum.photos/seed/camisasdama-011/300/400',
      category: 'Niña',
      size: '14',
      color: 'Rojo',
      createdAt: '2024-03-08T20:10:00Z'
    },
    {
      id: 'p-012',
      name: 'Blazer rosa pastel',
      price: 1349,
      image: 'https://picsum.photos/seed/camisasdama-012/300/400',
      category: 'Dama',
      size: 'M',
      color: 'Rosa',
      createdAt: '2024-04-12T07:50:00Z'
    },
    {
      id: 'p-013',
      name: 'Falda plisada morada',
      price: 799,
      image: 'https://picsum.photos/seed/camisasdama-013/300/400',
      category: 'Dama',
      size: 'S',
      color: 'Morado',
      createdAt: '2024-02-02T13:00:00Z'
    },
    {
      id: 'p-014',
      name: 'Conjunto sport blanco',
      price: 899,
      image: 'https://picsum.photos/seed/camisasdama-014/300/400',
      category: 'Dama',
      size: 'L',
      color: 'Blanco',
      createdAt: '2023-10-21T09:40:00Z'
    },
    {
      id: 'p-015',
      name: 'Abrigo negro elegante',
      price: 1599,
      image: 'https://picsum.photos/seed/camisasdama-015/300/400',
      category: 'Dama',
      size: 'XL',
      color: 'Negro',
      createdAt: '2024-01-12T17:25:00Z'
    },
    {
      id: 'p-016',
      name: 'Vestido azul marino',
      price: 989,
      image: 'https://picsum.photos/seed/camisasdama-016/300/400',
      category: 'Dama',
      size: 'M',
      color: 'Azul',
      createdAt: '2024-03-02T10:55:00Z'
    }
  ];

   private itemsPerPage = 12;
  page = 1;
  totalPages = 1;
  filteredProducts: Product[] = [];
  pagedProducts: Product[] = [];
  appliedChips: FilterChip[] = [];
  isFiltersOpen = false;

  private initialQueryApplied = false;
  private resizeObserver?: ResizeObserver;
  private selectedCategories = new Set<Category>();
  private selectedSizes = new Set<Size>();
  private selectedColors = new Set<Color>();
  private readonly handleViewportResize = () => this.onViewportChange();

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
  ) {}
  
  ngOnInit(): void {
  // 1) Inicializa desde URL o storage, pero SIN navegar
  const snapshotPm: ParamMap = this.route.snapshot.queryParamMap;
  if (this.hasQueryParams(snapshotPm)) {
    this.syncFormFromQuery(snapshotPm);
  } else {
    const stored = this.loadStateFromStorage();
    if (stored) this.applyStoredState(stored);
    // si no hay nada, se quedan los defaults del form
  }

  // 2) Pinta inmediatamente productos + chips
  this.filterProducts(); // ← ya rellena filtered/paged y hace markForCheck

  // 3) A partir de aquí, ya no estamos en bootstrap
  this.isBootstrapping = false;

  // 4) Cambios del form → aplicar filtros + escribir URL
  this.filtersForm.valueChanges
    .pipe(takeUntilDestroyed())
    .subscribe(() => {
      if (this.isBootstrapping) return;      // guard
      this.page = 1;
      this.syncQueryFromForm();              // ahora sí
      this.filterProducts();
    });

  // 5) Cambios futuros de la URL (back/forward/enlaces)
  this.route.queryParamMap
    .pipe(takeUntilDestroyed())
    .subscribe((pm: ParamMap) => {
      if (this.isBootstrapping) return;      // guard
      this.syncFormFromQuery(pm);
      this.filterProducts();
    });
}

  ngAfterViewInit(): void {
    this.onViewportChange();
    if (this.isBrowser()) {
      window.addEventListener('resize', this.handleViewportResize, {
        passive: true
      });
      if (typeof ResizeObserver !== 'undefined' && this.productsGridRef) {
      }
    }
  }

  ngOnDestroy(): void {
    this.enableBodyScroll();
    if (this.isBrowser()) {
      window.removeEventListener('resize', this.handleViewportResize);
    }
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
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
  const current = new Set(control.value ?? []);
  checked ? current.add(value) : current.delete(value);
  control.setValue([...current] as never, { emitEvent: true }); // esto dispara valueChanges
}

  onSortChange(): void {
    this.page = 1;
    this.syncQueryFromForm();
    this.filterProducts();
  }

  onPriceChange(): void {

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

  trackByCategory(_index: number, category: Category): Category {
    return category;
  }

  trackBySize(_index: number, size: Size): Size {
    return size;
  }

  trackByColor(_index: number, color: Color): Color {
    return color;
  }

  isCategorySelected(category: Category): boolean {
    return this.selectedCategories.has(category);
  }

  isSizeSelected(size: Size): boolean {
    return this.selectedSizes.has(size);
  }

  isColorSelected(color: Color): boolean {
    return this.selectedColors.has(color);
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
    this.updateSelectionSets(categories, sizes, colors);
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

  if (this.page > this.totalPages) this.page = this.totalPages;
  if (this.page < 1) this.page = 1;

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

    private updateSelectionSets(categories: Category[], sizes: Size[], colors: Color[]): void {
    this.selectedCategories = new Set(categories);
    this.selectedSizes = new Set(sizes);
    this.selectedColors = new Set(colors);
  }

  private onViewportChange(): void {
    const previous = this.itemsPerPage;
    if (previous !== this.itemsPerPage) {
      this.updatePagination();
    }
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
  if (this.isBootstrapping) return;  // 👈 evita navegar en el primer render

  const { categories, sizes, colors, priceMin, priceMax, sort } = this.filtersForm.getRawValue();
  const queryParams: Params = {
    categories: categories.length ? categories.join(',') : null,
    sizes: sizes.length ? sizes.join(',') : null,
    colors: colors.length ? colors.join(',') : null,
    priceMin: priceMin ?? null,
    priceMax: priceMax ?? null,
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