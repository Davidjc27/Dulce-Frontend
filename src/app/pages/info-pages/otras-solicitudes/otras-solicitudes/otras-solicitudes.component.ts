import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface RequestType {
  icon: string;
  title: string;
  body: string;
  channel: string;
}

interface Step {
  number: string;
  title: string;
  body: string;
}

interface DetailItem {
  title: string;
  body: string;
}

@Component({
  selector: 'app-otras-solicitudes-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './otras-solicitudes.component.html',
  styleUrls: ['../../info-shared.css', './otras-solicitudes.component.css']
})
export class OtrasSolicitudesPageComponent {
  readonly requestTypes: RequestType[] = [
    {
      icon: '🧾',
      title: 'Certificados y comprobantes',
      body: 'Solicita facturas electrónicas, certificados tributarios o soportes para tus compras corporativas y personales.',
      channel: 'Formulario digital con envío automático a tu correo'
    },
    {
      icon: '🎁',
      title: 'Regalos corporativos',
      body: 'Coordinamos entregas personalizadas para tus equipos o eventos especiales con empaques y mensajes únicos.',
      channel: 'Asesor dedicado vía correo corporativo'
    },
    {
      icon: '💼',
      title: 'Ventas al por mayor',
      body: 'Recibe condiciones preferenciales y catálogos exclusivos para compras superiores a 30 unidades.',
      channel: 'Línea empresarial 01 8000 51 55'
    },
    {
      icon: '🧵',
      title: 'Arreglos especiales',
      body: 'Solicita ajustes de confección para uniformes o colecciones cápsula con nuestro taller especializado.',
      channel: 'Videollamada previa programación'
    }
  ];

  readonly steps: Step[] = [
    {
      number: '01',
      title: 'Cuéntanos tu necesidad',
      body: 'Diligencia el formulario indicando tipo de solicitud, número de pedido si aplica y el resultado que esperas.'
    },
    {
      number: '02',
      title: 'Recibe confirmación',
      body: 'Te enviaremos un número de caso y un resumen al correo registrado para que sigas el proceso en todo momento.'
    },
    {
      number: '03',
      title: 'Asignamos un especialista',
      body: 'Un asesor de relaciones Dulce analizará tu solicitud y te contactará con las opciones disponibles.'
    },
    {
      number: '04',
      title: 'Seguimiento transparente',
      body: 'Te mantenemos informado hasta el cierre. También podrás responder al correo de confirmación si necesitas ajustes.'
    }
  ];

  readonly documents: DetailItem[] = [
    {
      title: 'Soportes de compra',
      body: 'Número de pedido, factura o evidencia del pago para validar la información rápidamente.'
    },
    {
      title: 'Datos de contacto actualizados',
      body: 'Correo y teléfono donde podamos entregarte la respuesta y coordinar detalles adicionales.'
    },
    {
      title: 'Autorizaciones especiales',
      body: 'Si tramitas para un tercero, adjunta carta de autorización firmada y copia del documento de identidad.'
    }
  ];

  readonly contacts: DetailItem[] = [
    {
      title: 'Formulario en línea',
      body: 'Disponible 24/7. Recibirás la confirmación inmediata con tu número de caso.'
    },
    {
      title: 'Línea corporativa',
      body: 'Lunes a viernes de 8:00 a.m. a 6:00 p.m. Marca la opción 3 para solicitudes especiales.'
    },
    {
      title: 'Correo directo',
      body: 'Escríbenos a relaciones@dulce.com y responderemos en máximo 24 horas hábiles.'
    }
  ];
}