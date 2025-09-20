import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface PathOption {
  icon: string;
  title: string;
  body: string;
  note: string;
}

interface Step {
  number: string;
  title: string;
  body: string;
}

interface CoverageItem {
  title: string;
  body: string;
}

@Component({
  selector: 'app-garantias-devoluciones-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './garantias-devoluciones.component.html',
  styleUrls: ['../../info-shared.css', './garantias-devoluciones.component.css']
})
export class GarantiasDevolucionesPageComponent {
  readonly pathOptions: PathOption[] = [
    {
      icon: '🧵',
      title: 'Garantía por calidad',
      body: 'Cubre defectos de fabricación, costuras, cierres y apliques dentro de los 60 días posteriores a la compra.',
      note: 'Requiere inspección de nuestro taller especializado'
    },
    {
      icon: '💳',
      title: 'Devolución de dinero',
      body: 'Si prefieres el reintegro al medio de pago original, lo procesamos cuando se apruebe la garantía.',
      note: 'El reembolso tarda entre 5 y 8 días hábiles'
    },
    {
      icon: '🪡',
      title: 'Reparación en taller Dulce',
      body: 'Nuestros artesanos restauran la prenda manteniendo los estándares originales de confección.',
      note: 'Incluye transporte ida y vuelta sin costo'
    },
    {
      icon: '🛍️',
      title: 'Cambio inmediato en tienda',
      body: 'Lleva la prenda con la factura y gestiona el cambio por talla o referencia similar en puntos Dulce autorizados.',
      note: 'Sujeto a disponibilidad de inventario'
    }
  ];

  readonly steps: Step[] = [
    {
      number: '01',
      title: 'Registra la novedad',
      body: 'Ingresa a tu cuenta Dulce o acércate a tienda. Adjunta fotos y una breve descripción de lo ocurrido con la prenda.'
    },
    {
      number: '02',
      title: 'Evaluación técnica',
      body: 'Nuestro laboratorio textil revisa materiales, confección y uso para darte una respuesta precisa.'
    },
    {
      number: '03',
      title: 'Definición de solución',
      body: 'Te informamos si la prenda será reparada, cambiada o si aplicará devolución de dinero.'
    },
    {
      number: '04',
      title: 'Entrega y seguimiento',
      body: 'Recibirás notificaciones con la fecha estimada de entrega o reintegro y el número de guía en caso de envío.'
    }
  ];

  readonly coverages: CoverageItem[] = [
    {
      title: 'Costuras y terminados',
      body: 'Reparaciones de costuras descosidas, botones o cierres defectuosos causados por fabricación.'
    },
    {
      title: 'Colores y estampados',
      body: 'Desvanecimiento prematuro o desprendimiento de estampados por fallas en tintura o fijación.'
    },
    {
      title: 'Tejidos especiales',
      body: 'Aplica para punto, denim y lino con defectos de hilado o encogimiento fuera de los parámetros de Dulce.'
    }
  ];

  readonly checklist: string[] = [
    'Factura o número de pedido para validar la fecha de compra.',
    'Fotografías de la prenda donde se identifique la novedad.',
    'Datos de contacto actualizados y dirección para la recogida si aplica.'
  ];
}