import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';
import { CartService } from '../../services/cart.service';

interface Tariff {
  name: string;
  internet: string;
  calls: string;
  extra1: string;
  extra2: string;
  extra3: string;
  price: number;
}

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
export class TariffsComponent {
  tariffs: Tariff[] = [
    {
      name: 'NetGo Prime',
      internet: '60 GB mobilnet',
      calls: '100 perc beszéd',
      extra1: 'Korlátlan le-/feltöltési sebesség',
      extra2: 'További perc- és SMS-díj: 40 Ft',
      extra3: '60 GB felhasználható az EU roaming 1-es díjzónában a belföldi adatkeretből',
      price: 11490,
    },
    {
      name: 'NetGo Prime Plus',
      internet: 'Korlátlan mobilnet',
      calls: '200 perc beszéd',
      extra1: 'Korlátlan le-/feltöltési sebesség',
      extra2: 'További perc- és SMS-díj: 40 Ft',
      extra3: '60 GB felhasználható az EU roaming 1-es díjzónában a belföldi adatkeretből',
      price: 13990,
    },
    {
      name: 'NetGo Prime Extra',
      internet: 'Korlátlan mobilnet',
      calls: 'Korlátlan beszéd',
      extra1: '70 GB EU roaming',
      extra2: 'SMS-díj: 40 Ft',
      extra3: '70 GB felhasználható az EU roaming 1-es díjzónában a belföldi adatkeretből',
      price: 16990,
    },
    {
      name: 'NetGo Prime Start',
      internet: '25 GB mobilnet',
      calls: '200 perc beszéd',
      extra1: 'Korlátlan sebesség',
      extra2: 'További perc- és SMS-díj: 40 Ft',
      extra3: '25 GB felhasználható az EU roaming 1-es díjzónában a belföldi adatkeretből',
      price: 8990,
    },
    {
      name: 'NetGo Start',
      internet: '2 GB mobilnet',
      calls: '100 perc beszéd',
      extra1: 'Korlátlan sebesség',
      extra2: 'További perc- és SMS-díj: 40 Ft',
      extra3: '2 GB felhasználható az EU roaming 1-es díjzónában a belföldi adatkeretből',
      price: 4490,
    },
    {
      name: 'NetGo Prime Max',
      internet: 'Korlátlan mobilnet',
      calls: 'Korlátlan beszéd',
      extra1: 'Korlátlan sebesség',
      extra2: '90 GB EU roaming',
      extra3: '90 GB felhasználható az EU roaming 1-es díjzónában a belföldi adatkeretből',
      price: 22990,
    },
  ];

  constructor(private cartService: CartService, private router: Router) {}
  
  addToCart(tariff: any) {
    this.cartService.addToCart(tariff);
    this.router.navigate(['/cart']);
  }
}