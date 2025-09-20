import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  category?: string;
  subCategory?: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private static readonly STORAGE_KEY = 'dulce_cart_state';

  private readonly itemsSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());

  readonly items$ = this.itemsSubject.asObservable();
  readonly totalQuantity$ = this.items$.pipe(
    map(items => items.reduce((acc, item) => acc + item.quantity, 0))
  );
  readonly subtotal$ = this.items$.pipe(
    map(items => items.reduce((acc, item) => acc + item.product.price * item.quantity, 0))
  );

  addItem(product: CartProduct, quantity = 1): void {
    if (!product?.id) {
      return;
    }

    const normalizedQuantity = Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1;
    const currentItems = [...this.itemsSubject.value];
    const existingIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (existingIndex > -1) {
      currentItems[existingIndex] = {
        ...currentItems[existingIndex],
        quantity: currentItems[existingIndex].quantity + normalizedQuantity
      };
    } else {
      currentItems.push({
        product: { ...product },
        quantity: normalizedQuantity
      });
    }

    this.persist(currentItems);
  }

  updateQuantity(productId: string, quantity: number): void {
    if (!productId) {
      return;
    }

    const normalizedQuantity = Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1;
    const currentItems = this.itemsSubject.value.map(item =>
      item.product.id === productId ? { ...item, quantity: normalizedQuantity } : item
    );

    this.persist(currentItems);
  }

  increment(productId: string): void {
    this.modifyQuantity(productId, 1);
  }

  decrement(productId: string): void {
    this.modifyQuantity(productId, -1);
  }

  removeItem(productId: string): void {
    if (!productId) {
      return;
    }

    const nextItems = this.itemsSubject.value.filter(item => item.product.id !== productId);
    this.persist(nextItems);
  }

  clearCart(): void {
    this.persist([]);
  }

  private modifyQuantity(productId: string, delta: number): void {
    if (!productId || delta === 0) {
      return;
    }

    const currentItems = [...this.itemsSubject.value];
    const index = currentItems.findIndex(item => item.product.id === productId);

    if (index === -1) {
      return;
    }

    const nextQuantity = currentItems[index].quantity + delta;

    if (nextQuantity <= 0) {
      currentItems.splice(index, 1);
    } else {
      currentItems[index] = { ...currentItems[index], quantity: nextQuantity };
    }

    this.persist(currentItems);
  }

  private persist(items: CartItem[]): void {
    this.itemsSubject.next(items);
    this.saveToStorage(items);
  }

  private loadFromStorage(): CartItem[] {
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
      return [];
    }

    try {
      const raw = window.localStorage.getItem(CartService.STORAGE_KEY);
      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw) as CartItem[];
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .map(item => ({
          product: { ...item.product },
          quantity: Number.isFinite(item.quantity) ? Math.max(1, Math.floor(item.quantity)) : 1
        }))
        .filter(item => !!item.product?.id);
    } catch (error) {
      console.error('No se pudo leer el estado del carrito', error);
      return [];
    }
  }

  private saveToStorage(items: CartItem[]): void {
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(CartService.STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('No se pudo guardar el estado del carrito', error);
    }
  }
}