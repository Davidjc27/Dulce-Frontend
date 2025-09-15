import { Component } from '@angular/core';
import { NgFor, CurrencyPipe } from '@angular/common';

interface Product {
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, CurrencyPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  products: Product[] = [
    { name: 'Camisa denim', price: 59.99, image: 'https://via.placeholder.com/300' },
    { name: 'Chaqueta cuero', price: 120, image: 'https://via.placeholder.com/300' },
    { name: 'Jeans skinny', price: 70.5, image: 'https://via.placeholder.com/300' }
  ];
}