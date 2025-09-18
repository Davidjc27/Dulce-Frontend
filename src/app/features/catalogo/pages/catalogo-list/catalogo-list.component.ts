import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ParamMap } from '@angular/router';

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
export default class CatalogoListComponent implements OnInit {
  private static readonly STORAGE_KEY = 'catalogo_filters_state';

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
@@ -328,156 +328,160 @@ export default class CatalogoListComponent implements OnInit, OnDestroy {
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

  public ngOnDestroy(): void {
    this.enableBodyScroll();
  }

  public applyFilters(): void {
    this.page = 1;
    this.syncQueryFromForm();
    this.filterProducts();
  }

  public clearFilters(): void {
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

  public onCheckboxChange(
    controlName: 'categories' | 'sizes' | 'colors',
    value: string,
    checked: boolean
  ): void {
    const control = this.filtersForm.controls[controlName] as FormControl<string[]>;
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
    control.setValue(current);
    this.applyFilters();
  }

  public onSortChange(): void {
    this.page = 1;
    this.syncQueryFromForm();
    this.filterProducts();
  }

  public onPriceChange(): void {
    this.applyFilters();
  }

  public removeFilterChip(chip: FilterChip): void {
    switch (chip.type) {
      case 'categories':
      case 'sizes':
      case 'colors': {
        const control = this.filtersForm.controls[chip.type];
        const updated = control.value.filter(value => value !== chip.value);
        control.setValue(updated as never);
        break;
      }
      case 'price':
        this.filtersForm.patchValue({ priceMin: null, priceMax: null });
        break;
    }
    this.applyFilters();
  }

  public goToPreviousPage(): void {
    if (this.page > 1) {
      this.page -= 1;
      this.syncQueryFromForm();
      this.updatePagination();
    }
  }

  public goToNextPage(): void {
    if (this.page < this.totalPages) {
      this.page += 1;
      this.syncQueryFromForm();
      this.updatePagination();
    }
  }

  public goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.syncQueryFromForm();
      this.updatePagination();
    }
  }

  public openFilters(): void {
    this.isFiltersOpen = true;
    this.disableBodyScroll();
  }

  public closeFilters(): void {
    this.isFiltersOpen = false;
    this.enableBodyScroll();
    queueMicrotask(() => this.filtersButton?.nativeElement.focus());
  }

  public trackById(_index: number, product: Product): string {
    return product.id;
  }

  public trackByChip(_index: number, chip: FilterChip): string {
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