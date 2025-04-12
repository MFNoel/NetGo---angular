import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tariffs = [
    {
      title: 'Prime tarifák',
      description: 'Korlátlanságra vágysz? Az új NetGo Prime tarifák között biztosan találsz igényeidnek megfelelő tarifacsomagot.',
      price: '13 990',
      currency: 'Ft',
      image: 'assets/home1.png'
    },
    {
      title: 'NetGo Start tarifa',
      description: 'Ha netezni is szeretnél, beszélgetni is, és mindezt kedvező havidíjért, akkor van számodra egy jó ajánlatunk.',
      price: '4 490',
      currency: 'Ft',
      image: 'assets/home2.png'
    }
  ];
}