import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Channel {
  icon: string;
  title: string;
  detail: string;
  description: string;
}

@Component({
  selector: 'app-contacto-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './contacto.component.html',
  styleUrls: ['../info-shared.css', './contacto.component.css']
})
export class ContactoPageComponent {
  readonly channels: Channel[] = [
    {
      icon: '💬',
      title: 'WhatsApp Dulce',
      detail: '+57 322 823 0631',
      description: 'Resolvemos pedidos, cambios y asesorías de estilo en tiempo real.'
    },
    {
      icon: '☎️',
      title: 'Línea boutique',
      detail: '(601) 456 12 34',
      description: 'Disponible de lunes a sábado de 8 a.m. a 8 p.m. y domingos hasta las 6 p.m.'
    },
    {
      icon: '📧',
      title: 'Correo dulce',
      detail: 'hola@dulce.com',
      description: 'Escríbenos para alianzas, prensa o solicitudes especiales. Respondemos en menos de 24 horas hábiles.'
    }
  ];

  readonly visitReasons: { title: string; body: string }[] = [
    {
      title: 'Asesoría personalizada',
      body: 'Agenda una cita virtual o presencial para construir looks completos con nuestras estilistas.'
    },
    {
      title: 'Atención posventa',
      body: 'Gestiona arreglos, garantías o preguntas sobre el cuidado de tus prendas Dulce.'
    },
    {
      title: 'Aliados Dulce',
      body: '¿Eres creadora, emprendedora o prensa? Conversemos sobre colaboraciones.'
    }
  ];
}