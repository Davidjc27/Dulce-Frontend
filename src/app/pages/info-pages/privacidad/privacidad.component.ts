import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-privacidad-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './privacidad.component.html',
  styleUrls: ['../info-shared.css', './privacidad.component.css']
})
export class PrivacidadPageComponent {
  readonly principles = [
    {
      icon: '🔐',
      title: 'Protección total',
      body: 'Custodiamos tu información con tecnología de cifrado avanzada y proveedores certificados PCI DSS.'
    },
    {
      icon: '🪪',
      title: 'Transparencia',
      body: 'Solo solicitamos los datos necesarios para gestionar tus compras y experiencias Dulce.'
    },
    {
      icon: '🧭',
      title: 'Control en tus manos',
      body: 'Puedes actualizar, descargar o eliminar tus datos desde tu perfil en cualquier momento.'
    }
  ];

  readonly sections = [
    {
      title: 'Datos que recolectamos',
      description:
        'Nombre, identificación, datos de contacto, historial de compras y preferencias. También recolectamos datos de navegación de forma anonimizada.'
    },
    {
      title: '¿Para qué los usamos?',
      description:
        'Procesar pedidos, ofrecer recomendaciones, enviar comunicaciones relevantes y mejorar la experiencia del sitio.'
    },
    {
      title: 'Compartimos tu información solo cuando es necesario',
      description:
        'Aliados logísticos, pasarelas de pago y plataformas de email marketing que cumplen estándares internacionales de protección de datos.'
    }
  ];

  readonly rights = [
    'Acceder, rectificar o actualizar tus datos personales.',
    'Solicitar la eliminación o suspensión temporal de tus datos.',
    'Revocar la autorización para el tratamiento cuando no haya obligaciones vigentes.',
    'Presentar quejas ante la SIC si consideras vulnerados tus derechos.'
  ];
}
