import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  addToCart(item: any) {
    this.cartItemsSubject.next([item]);
  }

  removeFromCart(item: any) {
    this.cartItemsSubject.next([]);
  }

  getTotalPrice(): number {
    const items = this.cartItemsSubject.value;
    return items.length ? items[0].price : 0;
  }
}