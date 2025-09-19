import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-terminos-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './terminos.component.html',
  styleUrls: ['../info-shared.css', './terminos.component.css']
})
export class TerminosPageComponent {
  readonly clauses = [
    {
      title: 'Aceptación de términos',
      description: 'Al comprar o navegar en Dulce aceptas nuestras políticas de uso, privacidad y manejo de datos.'
    },
    {
      title: 'Propiedad intelectual',
      description: 'Los diseños, fotografías y contenidos pertenecen a Dulce S.A.S y no pueden reproducirse sin autorización.'
    },
    {
      title: 'Disponibilidad de productos',
      description: 'Las existencias se actualizan en tiempo real, sin embargo pueden presentarse variaciones al momento de cerrar tu compra.'
    }
  ];

  readonly commitments = [
    {
      icon: '🚚',
      title: 'Despachos confiables',
      body: 'Trabajamos con aliados certificados para asegurar la entrega de tus pedidos en los tiempos prometidos.'
    },
    {
      icon: '💳',
      title: 'Pagos seguros',
      body: 'Procesamos transacciones mediante pasarelas que cumplen estándares PCI y 3D Secure.'
    },
    {
      icon: '🤝',
      title: 'Relación transparente',
      body: 'Informamos cualquier cambio en precios o promociones antes de concretar tu pedido.'
    }
  ];

  readonly userResponsibilities = [
    'Usar el sitio respetando la experiencia de otros usuarios.',
    'Proveer información veraz y actualizada para el despacho de tus pedidos.',
    'Conservar tus credenciales de acceso en un lugar seguro.',
    'Cumplir con las políticas de cambios, devoluciones y garantías.'
  ];
}