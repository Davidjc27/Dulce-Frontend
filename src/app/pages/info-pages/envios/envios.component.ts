import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Zone {
  region: string;
  time: string;
  price: string;
}

@Component({
  selector: 'app-envios-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './envios.component.html',
  styleUrls: ['../info-shared.css', './envios.component.css']
})
export class EnviosPageComponent {
  readonly zones: Zone[] = [
    { region: 'Ciudades principales', time: '24 - 48 horas', price: 'Gratis desde $150.000' },
    { region: 'Ciudades intermedias', time: '2 - 4 días hábiles', price: '$9.900' },
    { region: 'Zonas especiales', time: '4 - 7 días hábiles', price: '$14.900' }
  ];

  readonly services = [
    {
      icon: '🚚',
      title: 'Entrega programada',
      body: 'Elige la franja horaria que prefieras en ciudades principales. Te avisamos 30 minutos antes de llegar.'
    },
    {
      icon: '📦',
      title: 'Pick up express',
      body: 'Compra en línea y recoge en tienda en solo 2 horas. Te avisamos cuando esté listo.'
    },
    {
      icon: '🎁',
      title: 'Empaques regalo',
      body: 'Agrega un mensaje personalizado y envolvemos tu pedido con papel semilla reutilizable.'
    }
  ];

  readonly tips = [
    'Revisa que la dirección esté completa con barrio y referencias claras.',
    'Si necesitas cambiar la fecha de entrega, escríbenos antes de las 6 p.m. del día previo.',
    'Puedes rastrear tu pedido en tiempo real desde tu cuenta Dulce o con el link enviado por correo.'
  ];
}