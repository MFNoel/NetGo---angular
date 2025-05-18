import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';
import { TariffService } from '../../shared/services/tariff.service';
import { Tariff } from '../../shared/models/Tariff';

@Component({
  selector: 'app-tariffs',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    PriceFormatPipe
  ],
  templateUrl: './tariffs.component.html',
  styleUrls: ['./tariffs.component.css'],
})
export class TariffsComponent implements OnInit {
  tariffs: Tariff[] = [];

  constructor(private cartService: TariffService, private router: Router) {}

  ngOnInit(): void {
    this.loadTariffs();
  }

  async loadTariffs(): Promise<void> {
    try {
      this.tariffs = await this.cartService.getAllTariffs();
    } catch (error) {
      console.error('Hiba a tarifák betöltésekor:', error);
    }
  }

  addToCart(tariff: Tariff) {
    this.cartService.addToCart(tariff);
    this.router.navigate(['/cart']);
  }
}