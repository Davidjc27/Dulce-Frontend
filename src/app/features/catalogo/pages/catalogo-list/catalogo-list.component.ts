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
import { ActivatedRoute, ParamMap, Params, Router,NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';

type Category = 'Dama' | 'Niña';
type SubCategory = 'Pijamas' | 'Blusas' | 'Camisetas' | 'Leggins';
type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | '4' | '6' | '8' | '10' | '12' | '14';
type Color = 'Negro' | 'Blanco' | 'Azul' | 'Rojo' | 'Verde' | 'Amarillo' | 'Morado' | 'Rosa';
type SortOptionValue = 'relevance' | 'priceAsc' | 'priceDesc' | 'newest';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  subCategory: SubCategory;
  size: Size;
  color: Color;
  createdAt: string;
}

interface FilterChip {
  type: 'categories' | 'subCategories' | 'sizes' | 'colors' | 'price';
  value: string;
  label: string;
}

interface StoredFiltersState {
  categories: Category[];
  subCategories: SubCategory[];
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
  private readonly itemsPerPage = 12; 

  readonly categoryOptions: Category[] = ['Dama', 'Niña'];
  readonly subCategoryOptions: SubCategory[] = ['Pijamas', 'Blusas', 'Camisetas', 'Leggins'];
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
     subCategories: new FormControl<SubCategory[]>([], { nonNullable: true }),
    sizes: new FormControl<Size[]>([], { nonNullable: true }),
    colors: new FormControl<Color[]>([], { nonNullable: true }),
    priceMin: new FormControl<number | null>(null),
    priceMax: new FormControl<number | null>(null),
    sort: new FormControl<SortOptionValue>('relevance', { nonNullable: true })
  });

  readonly allProducts: Product[] = [
    {
      id: 'p-001',
      name: 'Pijama satín suave dama',
      price: 1249,
      image: 'https://picsum.photos/seed/dama-pijama-001/300/400',
      category: 'Dama',
      subCategory: 'Pijamas',
      size: 'M',
      color: 'Rosa',
      createdAt: '2024-04-12T07:50:00Z'
    },
    {
      id: 'p-002',
      name: 'Pijama algodón fresco dama',
      price: 999,
      image: 'https://picsum.photos/seed/dama-pijama-002/300/400',
      category: 'Dama',
      subCategory: 'Pijamas',
      size: 'S',
      color: 'Azul',
      createdAt: '2024-03-28T16:20:00Z'
    },
    {
      id: 'p-003',
      name: 'Blusa bordada ivory',
      price: 759,
      image: 'https://picsum.photos/seed/dama-blusa-001/300/400',
      category: 'Dama',
      subCategory: 'Blusas',
      size: 'M',
      color: 'Blanco',
      createdAt: '2024-03-08T20:10:00Z'
    },
    {
      id: 'p-004',
      name: 'Blusa plisada nocturna',
      price: 829,
      image: 'https://picsum.photos/seed/dama-blusa-002/300/400',
      category: 'Dama',
      subCategory: 'Blusas',
      size: 'L',
      color: 'Negro',
      createdAt: '2024-02-28T15:30:00Z'
    },
    {
      id: 'p-005',
      name: 'Camiseta básica índigo',
      price: 449,
      image: 'https://picsum.photos/seed/dama-camiseta-001/300/400',
      category: 'Dama',
      subCategory: 'Camisetas',
      size: 'S',
      color: 'Azul',
      createdAt: '2024-02-12T08:10:00Z'
    },
    {
      id: 'p-006',
      name: 'Camiseta esencial carmín',
      price: 479,
      image: 'https://picsum.photos/seed/dama-camiseta-002/300/400',
      category: 'Dama',
      subCategory: 'Camisetas',
      size: 'M',
      color: 'Rojo',
      createdAt: '2024-01-22T09:15:00Z'
    },
    {
      id: 'p-007',
      name: 'Leggins esculpidos grafito',
      price: 699,
      image: 'https://picsum.photos/seed/dama-leggins-001/300/400',
      category: 'Dama',
      subCategory: 'Leggins',
      size: 'L',
      color: 'Negro',
      createdAt: '2024-01-12T17:25:00Z'
    },
    {
      id: 'p-008',
      name: 'Leggins compresión oliva',
      price: 729,
      image: 'https://picsum.photos/seed/dama-leggins-002/300/400',
      category: 'Dama',
      subCategory: 'Leggins',
      size: 'XL',
      color: 'Verde',
      createdAt: '2023-12-27T19:00:00Z'
    },
    {
      id: 'p-009',
      name: 'Pijama algodón estelar niña',
      price: 589,
      image: 'https://picsum.photos/seed/nina-pijama-001/300/400',
      category: 'Niña',
      subCategory: 'Pijamas',
      size: '6',
      color: 'Rosa',
      createdAt: '2024-04-04T18:45:00Z'
    },
    {
      id: 'p-010',
      name: 'Pijama polar constelación niña',
      price: 619,
      image: 'https://picsum.photos/seed/nina-pijama-002/300/400',
      category: 'Niña',
      subCategory: 'Pijamas',
      size: '8',
      color: 'Azul',
      createdAt: '2024-03-15T10:00:00Z'
    },
    {
      id: 'p-011',
      name: 'Blusa floral amanecer',
      price: 389,
      image: 'https://picsum.photos/seed/nina-blusa-001/300/400',
      category: 'Niña',
      subCategory: 'Blusas',
      size: '10',
      color: 'Amarillo',
      createdAt: '2024-02-02T13:00:00Z'
    },
    {
      id: 'p-012',
      name: 'Blusa magia lavanda',
      price: 409,
      image: 'https://picsum.photos/seed/nina-blusa-002/300/400',
      category: 'Niña',
      subCategory: 'Blusas',
      size: '12',
      color: 'Morado',
      createdAt: '2023-12-10T12:00:00Z'
    },
    {
      id: 'p-013',
      name: 'Camiseta algodón nube',
      price: 329,
      image: 'https://picsum.photos/seed/nina-camiseta-001/300/400',
      category: 'Niña',
      subCategory: 'Camisetas',
      size: '4',
      color: 'Blanco',
      createdAt: '2023-11-18T14:05:00Z'
    },
    {
      id: 'p-014',
      name: 'Camiseta ola turquesa',
      price: 339,
      image: 'https://picsum.photos/seed/nina-camiseta-002/300/400',
      category: 'Niña',
      subCategory: 'Camisetas',
      size: '6',
      color: 'Azul',
      createdAt: '2023-10-21T09:40:00Z'
    },
    {
      id: 'p-015',
      name: 'Leggins aventura grafito',
      price: 369,
      image: 'https://picsum.photos/seed/nina-leggins-001/300/400',
      category: 'Niña',
      subCategory: 'Leggins',
      size: '8',
      color: 'Negro',
      createdAt: '2023-09-14T11:00:00Z'
    },
    {
      id: 'p-016',
      name: 'Leggins energía jade',
      price: 379,
      image: 'https://picsum.photos/seed/nina-leggins-002/300/400',
      category: 'Niña',
      subCategory: 'Leggins',
      size: '10',
      color: 'Verde',
      createdAt: '2023-08-30T08:30:00Z'
    }
  ];

  page = 1;
  filteredProducts: Product[] = [...this.allProducts];
  totalPages = Math.max(1, Math.ceil(this.filteredProducts.length / this.itemsPerPage));
  pagedProducts: Product[] = this.filteredProducts.slice(0, this.itemsPerPage);
  appliedChips: FilterChip[] = [];
  isFiltersOpen = false;
  emptyStateMessage = 'No se encontraron productos con los filtros seleccionados.';

  private resizeObserver?: ResizeObserver;
  private selectedCategories = new Set<Category>();
  private selectedSubCategories = new Set<SubCategory>();
  private selectedSizes = new Set<Size>();
  private selectedColors = new Set<Color>();
  private readonly handleViewportResize = () => this.onViewportChange();

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
  ) {}
  
  ngOnInit(): void {
  // 1) Inicial: URL o storage, sin navegar
  const initialPm: ParamMap = this.route.snapshot.queryParamMap;
  if (this.hasQueryParams(initialPm)) {
    this.syncFormFromQuery(initialPm);
  } else {
    const stored = this.loadStateFromStorage();
    if (stored) this.applyStoredState(stored);
  }

  // 2) Pintar inmediatamente
  this.filterProducts();

  // 3) Fin de bootstrap
  this.isBootstrapping = false;
  this.cdr.detectChanges();

  // 4) Cambios del form -> escribir URL y aplicar filtros
  this.filtersForm.valueChanges
    .pipe(takeUntilDestroyed())
    .subscribe(() => {
      if (this.isBootstrapping) return;
      this.page = 1;
      this.syncQueryFromForm(); // ahora solo navega si hay diferencia real
      this.filterProducts();
    });

  // 5) SIEMPRE reaccionar a cambios de query params (navbar, back/forward, etc.)
  this.route.queryParamMap
    .pipe(takeUntilDestroyed())
    .subscribe((pm: ParamMap) => {
      // Sincroniza el form desde la URL sin disparar valueChanges
      this.isBootstrapping = true;
      this.syncFormFromQuery(pm);
      this.isBootstrapping = false;

      // Aplica filtros y repinta
      this.page = 1;
      this.filterProducts();
      this.cdr.detectChanges(); // OnPush
    });
}

  ngAfterViewInit(): void {
  this.onViewportChange();

  // 👉 Garantiza que todo pinte al entrar por primera vez
  queueMicrotask(() => {
    // recalcula por si algo dependía de la vista/medidas
    this.filterProducts();
    this.cdr.detectChanges();
  });

  if (this.isBrowser()) {
    window.addEventListener('resize', this.handleViewportResize, { passive: true });
    if (typeof ResizeObserver !== 'undefined' && this.productsGridRef) {
      // si luego quieres observar la grilla, puedes inicializar aquí.
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
      subCategories: [],
      sizes: [],
      colors: [],
      priceMin: null,
      priceMax: null,
      sort: 'relevance'
    });
    this.applyFilters();
  }

  onCheckboxChange(
  controlName: 'categories' | 'subCategories' | 'sizes' | 'colors',
  value: string,
  checked: boolean
): void {
  const control = this.filtersForm.get(controlName) as FormControl<string[]>;
  const current = new Set(control.value ?? []);
  checked ? current.add(value) : current.delete(value);

  // No dispares valueChanges aquí; nosotros controlamos el flujo
  control.setValue([...current] as never, { emitEvent: false });

  // Fuerza aplicación inmediata del filtro y URL
  this.page = 1;
  this.syncQueryFromForm();
  this.filterProducts();
}

  onSortChange(): void {
    this.page = 1;
    this.syncQueryFromForm();
    this.filterProducts();
  }

  onPriceChange(): void {
  // Valida y aplica inmediatamente
  const { priceMin, priceMax } = this.filtersForm.getRawValue();
  if (priceMin !== null && priceMax !== null && priceMin > priceMax) {
    // normaliza: si min > max, intercámbialos
    this.filtersForm.patchValue({ priceMin: priceMax, priceMax: priceMin }, { emitEvent: false });
  }
  this.page = 1;
  this.syncQueryFromForm();
  this.filterProducts();
}

  removeFilterChip(chip: FilterChip): void {
    switch (chip.type) {
      case 'categories':
        case 'subCategories':
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
    const {
      categories,
      subCategories,
      sizes,
      colors,
      priceMin,
      priceMax,
      sort
    } = this.filtersForm.getRawValue();
    let result = [...this.allProducts];

    if (categories.length) {
      result = result.filter(product => categories.includes(product.category));
    }

    if (subCategories.length) {
      result = result.filter(product => subCategories.includes(product.subCategory));
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
    this.updateSelectionSets(categories, subCategories, sizes, colors);
    this.updateAppliedChips();
    this.updatePagination();
    this.updateEmptyStateMessage(result.length, categories, subCategories);
    this.saveStateToStorage({
      categories,
      subCategories,
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
    const { categories, subCategories, sizes, colors, priceMin, priceMax } =
      this.filtersForm.getRawValue();

    categories.forEach(category => {
      chips.push({ type: 'categories', value: category, label: category });
    });

    subCategories.forEach(subCategory => {
      chips.push({ type: 'subCategories', value: subCategory, label: `Tipo: ${subCategory}` });
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

  private updateEmptyStateMessage(
    resultLength: number,
    categories: Category[],
    subCategories: SubCategory[]
  ): void {
    if (resultLength > 0) {
      this.emptyStateMessage = 'No se encontraron productos con los filtros seleccionados.';
      return;
    }

    if (subCategories.length === 1) {
      const subLabel = subCategories[0].toLocaleLowerCase();
      if (categories.length === 1) {
        const categoryLabel = categories[0].toLocaleLowerCase();
        this.emptyStateMessage = `Por ahora no tenemos ${subLabel} para ${categoryLabel}.`;
      } else {
        this.emptyStateMessage = `Por ahora no tenemos ${subLabel} disponibles.`;
      }
      return;
    }

    if (categories.length === 1) {
      const categoryLabel = categories[0].toLocaleLowerCase();
      this.emptyStateMessage = `No encontramos productos para ${categoryLabel} con estos filtros.`;
      return;
    }

    this.emptyStateMessage = 'No se encontraron productos con los filtros seleccionados.';
  }

    private updateSelectionSets(
    categories: Category[],
    subCategories: SubCategory[],
    sizes: Size[],
    colors: Color[]
  ): void {
    this.selectedCategories = new Set(categories);
    this.selectedSubCategories = new Set(subCategories);
    this.selectedSizes = new Set(sizes);
    this.selectedColors = new Set(colors);
  }

  private onViewportChange(): void {
  this.updatePagination();
}

  private syncFormFromQuery(paramMap: ParamMap): void {
    const categories = this.getQueryArray<Category>(paramMap, 'categories', this.categoryOptions);
    const subCategories = this.getQueryArray<SubCategory>(
      paramMap,
      'subCategories',
      this.subCategoryOptions
    );
    const sizes = this.getQueryArray<Size>(paramMap, 'sizes', this.sizeOptions);
    const colors = this.getQueryArray<Color>(paramMap, 'colors', this.colorOptions);

    const priceMinParam = this.parseNumber(paramMap.get('priceMin'));
    const priceMaxParam = this.parseNumber(paramMap.get('priceMax'));

    const sortParam = paramMap.get('sort') as SortOptionValue | null;
    const sort = this.sortOptions.some(option => option.value === sortParam) ? sortParam! : 'relevance';

    const pageParam = this.parseNumber(paramMap.get('page'));
    this.page = pageParam !== null && pageParam > 0 ? Math.floor(pageParam) : 1;

    this.filtersForm.setValue(
      {
        categories,
        subCategories,
        sizes,
        colors,
        priceMin: priceMinParam,
        priceMax: priceMaxParam,
        sort
      },
      { emitEvent: false }
    );
  }

  private syncQueryFromForm(): void {
  if (this.isBootstrapping) return; // evita navegar en el primer render

  // 1) Construye los query params exactamente como los escribiríamos en la URL
  const { categories, subCategories, sizes, colors, priceMin, priceMax, sort } =
    this.filtersForm.getRawValue();

  const nextParams: Params = {
    categories: categories.length ? categories.join(',') : null,
    subCategories: subCategories.length ? subCategories.join(',') : null,
    sizes: sizes.length ? sizes.join(',') : null,
    colors: colors.length ? colors.join(',') : null,
    priceMin: priceMin ?? null,
    priceMax: priceMax ?? null,
    sort: sort !== 'relevance' ? sort : null,
    page: this.page > 1 ? this.page : null
  };

  // 2) Compara firma de URL actual vs firma de lo que saldría del form.
  const currentSig = this.paramsSignature(this.route.snapshot.queryParamMap);
  const nextSig = this.paramsObjectSignature(nextParams);
  if (currentSig === nextSig) {
    return; // nada que escribir; evita re-navegaciones inútiles / loops
  }

  // 3) Navega (reemplazando URL para no apilar historial al tipear en filtros)
  this.router.navigate([], {
    relativeTo: this.route,
    queryParams: nextParams,
    replaceUrl: true
  });
}

  private hasQueryParams(paramMap: ParamMap): boolean {
    return paramMap.keys.some(key => paramMap.get(key) !== null && paramMap.get(key) !== '');
  }

  private applyStoredState(state: StoredFiltersState): void {
    this.filtersForm.setValue({
      categories: this.filterAllowedValues(state.categories, this.categoryOptions),
      subCategories: this.filterAllowedValues(state.subCategories, this.subCategoryOptions),
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
        subCategories: this.filterAllowedValues(parsed.subCategories ?? [], this.subCategoryOptions),
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

  private paramsObjectSignature(obj: Params): string {
    const keys = Object.keys(obj || {}).filter(k => obj[k] != null && obj[k] !== '').sort();
    const parts = keys.map(k => {
      const v = obj[k];
      const arr = Array.isArray(v) ? v : `${v}`.split(',');
      return `${k}=${arr.map(x => `${x}`.trim()).filter(Boolean).sort().join(',')}`;
    });
    return parts.join('&');
  }

  /** Firma estable para el ParamMap actual (URL real) */
  private paramsSignature(pm: ParamMap): string {
    const keys = [...pm.keys].sort();
    return keys.map(k => {
      const all = pm.getAll(k);
      const list = all.length ? all : (pm.get(k)?.split(',') ?? []);
      return `${k}=${list.map(v => v.trim()).filter(Boolean).sort().join(',')}`;
    }).join('&');
  }

}