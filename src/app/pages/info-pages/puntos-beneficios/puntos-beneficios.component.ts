import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Level {
  name: string;
  requirement: string;
  perks: string[];
}

@Component({
  selector: 'app-puntos-beneficios-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './puntos-beneficios.component.html',
  styleUrls: ['../info-shared.css', './puntos-beneficios.component.css']
})
export class PuntosBeneficiosPageComponent {
  readonly levels: Level[] = [
    {
      name: 'Dulce',
      requirement: 'Desde tu primera compra',
      perks: ['1 punto por cada $1.000', 'Bienvenida con 30 puntos', 'Acceso a preventas digitales']
    },
    {
      name: 'Caramelo',
      requirement: 'Acumula 1.500 puntos en el año',
      perks: ['1.2 puntos por cada $1.000', 'Eventos exclusivos en tienda', 'Envíos gratis ilimitados']
    },
    {
      name: 'Miel',
      requirement: 'Acumula 3.500 puntos en el año',
      perks: ['1.5 puntos por cada $1.000', 'Stylist personal on demand', 'Regalo especial en tu cumpleaños']
    }
  ];

  readonly waysToEarn = [
    'Compras en tienda física u online.',
    'Participar en talleres y experiencias Dulce.',
    'Reciclar prendas Dulce en nuestro programa de circularidad (100 puntos adicionales).',
    'Invitar amigas que realicen su primera compra (150 puntos).'
  ];

  readonly rewards = [
    {
      title: 'Descuentos',
      description: 'Redime desde 200 puntos por descuentos inmediatos en tu carrito.'
    },
    {
      title: 'Experiencias',
      description: 'Accede a clases de bordado, sesiones de styling o meriendas Dulce.'
    },
    {
      title: 'Impacto social',
      description: 'Dona tus puntos para apoyar programas de educación para niñas en el Pacífico.'
    }
  ];
}