import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TariffService } from '../../shared/services/tariff.service';
import { AuthService } from '../../shared/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice = 0;

  
constructor(
  private cartService: TariffService,
  private router: Router,
  private authService: AuthService
) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  removeFromCart() {
    this.cartService.removeFromCart();
  }

  goBackToTariffs() {
    this.router.navigate(['/tariffs']);
  }

  async order() {
    const user = await this.authService.currentUser.pipe(take(1)).toPromise();

    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.cartItems.length === 0) {
      alert('A kosár üres. Először válassz ki egy tarifát!');
      return;
    }

    try {
      await this.cartService.placeOrder();
      alert('Sikeres megrendelés!');
      this.router.navigate(['/tariffs']);
    } catch (error) {
      console.error('Rendelés közben hiba történt:', error);
      alert('Hiba történt a rendelés során.');
    }
  }
}