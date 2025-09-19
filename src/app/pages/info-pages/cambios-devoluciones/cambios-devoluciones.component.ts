import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Step {
  number: string;
  title: string;
  body: string;
}

@Component({
  selector: 'app-cambios-devoluciones-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './cambios-devoluciones.component.html',
  styleUrls: ['../info-shared.css', './cambios-devoluciones.component.css']
})
export class CambiosDevolucionesPageComponent {
  readonly steps: Step[] = [
    {
      number: '01',
      title: 'Solicita tu cambio',
      body: 'Ingresa a tu cuenta Dulce, elige la orden y selecciona “Quiero cambiar o devolver”. También puedes hacerlo en tienda con tu número de pedido.'
    },
    {
      number: '02',
      title: 'Prepara la prenda',
      body: 'Debe estar sin usar, con marquillas y empaque original. Incluye el comprobante o número de orden.'
    },
    {
      number: '03',
      title: 'Recoge o entrega',
      body: 'Coordinamos una recogida en 24 horas o puedes llevarla a tu tienda Dulce más cercana.'
    },
    {
      number: '04',
      title: 'Elige tu opción',
      body: 'Puedes cambiar por otra talla/color, solicitar saldo a favor o devolución al medio de pago original.'
    }
  ];

  readonly policies: { title: string; body: string }[] = [
    {
      title: 'Plazos especiales',
      body: 'Tienes 30 días para cambios y 15 días para devoluciones de dinero. En temporada navideña ampliamos hasta 45 días.'
    },
    {
      title: 'Productos elegibles',
      body: 'Aceptamos cambios de todas las categorías excepto prendas íntimas y accesorios con uso evidente.'
    },
    {
      title: 'Reembolsos',
      body: 'Procesamos devoluciones en 5 a 8 días hábiles después de validar la prenda en nuestro taller de calidad.'
    }
  ];
}