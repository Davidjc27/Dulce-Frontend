import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './faq.component.html',
  styleUrls: ['../info-shared.css', './faq.component.css']
})
export class FaqPageComponent {
  readonly faqs: FaqItem[] = [
    {
      question: '¿Cuánto tarda el envío?',
      answer: 'En las principales ciudades entregamos en 24-48 horas. Para destinos especiales puede tardar hasta 5 días hábiles. Siempre recibirás un correo con la guía y actualizaciones.'
    },
    {
      question: '¿Puedo cambiar la talla?',
      answer: 'Sí, cuentas con 30 días calendario. Puedes hacerlo en cualquier tienda Dulce o solicitando recogida a domicilio desde tu perfil.'
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Recibimos tarjetas débito y crédito, transferencias PSE, billeteras digitales y pago contraentrega en ciudades principales.'
    },
    {
      question: '¿Cómo cuido mis prendas?',
      answer: 'Lava en ciclo delicado con agua fría, evita blanqueadores y seca a la sombra. Cada prenda incluye una etiqueta con recomendaciones especiales.'
    },
    {
      question: '¿Puedo separar productos?',
      answer: 'Sí, con nuestro plan Dulce Apartado separas con el 30% y tienes 30 días para completar el pago en tienda o en línea.'
    },
    {
      question: '¿Cómo funcionan los puntos Dulce?',
      answer: 'Acumulas 1 punto por cada $1.000 en compras. Puedes redimirlos desde 200 puntos por descuentos, experiencias o donaciones.'
    }
  ];

  readonly contactOptions: { icon: string; title: string; body: string }[] = [
    {
      icon: '💬',
      title: 'Chat en vivo',
      body: 'Disponible todos los días de 8 a.m. a 8 p.m. desde nuestra web y app.'
    },
    {
      icon: '📞',
      title: 'Línea dulce',
      body: 'Llámanos al (601) 456 12 34 y agenda citas personalizadas o soporte de pedidos.'
    },
    {
      icon: '📧',
      title: 'Correo boutique',
      body: 'Escríbenos a hola@dulce.com y responderemos antes de 24 horas hábiles.'
    }
  ];
}