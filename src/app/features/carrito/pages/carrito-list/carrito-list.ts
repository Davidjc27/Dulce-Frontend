import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem, CartService } from '../../../../shared/services/cart.service';

@Component({
  selector: 'app-carrito-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito-list.html',
  styleUrls: ['./carrito-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarritoListComponent {
  private readonly cart = inject(CartService);

  readonly items$: Observable<CartItem[]> = this.cart.items$;
  readonly total$ = this.cart.subtotal$;
  readonly totalQuantity$ = this.cart.totalQuantity$;

  trackByItem(_index: number, item: CartItem): string {
    return item.product.id;
  }

  increment(productId: string): void {
    this.cart.increment(productId);
  }

  decrement(productId: string): void {
    this.cart.decrement(productId);
  }

  updateQuantity(productId: string, value: string | number): void {
    const quantity = Number(value);
    if (!Number.isFinite(quantity)) {
      return;
    }
    this.cart.updateQuantity(productId, quantity);
  }

  removeItem(productId: string): void {
    this.cart.removeItem(productId);
  }

  clearCart(): void {
    this.cart.clearCart();
  }
}