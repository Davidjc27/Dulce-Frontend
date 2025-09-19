import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Store {
  city: string;
  address: string;
  schedule: string;
  features: string[];
}

@Component({
  selector: 'app-tiendas-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './tiendas.component.html',
  styleUrls: ['../info-shared.css', './tiendas.component.css']
})
export class TiendasPageComponent {
  readonly stores: Store[] = [
    {
      city: 'Bogotá',
      address: 'Zona T - Cra. 12A #82-15',
      schedule: 'Lunes a sábado 10:00 a.m. - 8:00 p.m. | Domingo 11:00 a.m. - 6:00 p.m.',
      features: ['Atelier de personalización', 'Cafetería Dulce Moments', 'Espacio Kids']
    },
    {
      city: 'Medellín',
      address: 'El Tesoro Parque Comercial - Local 346',
      schedule: 'Lunes a domingo 10:00 a.m. - 8:00 p.m.',
      features: ['Asesoría de imagen', 'Clases de bordado', 'Pick up express']
    },
    {
      city: 'Barranquilla',
      address: 'Mall Plaza Buenavista - Nivel 2',
      schedule: 'Lunes a sábado 10:00 a.m. - 9:00 p.m. | Domingo 11:00 a.m. - 7:00 p.m.',
      features: ['Pasarela interactiva', 'Zona para retratos familiares', 'Entrega en 2 horas']
    },
    {
      city: 'Cali',
      address: 'Granada - Av. 9N #13N-34',
      schedule: 'Lunes a sábado 9:30 a.m. - 7:30 p.m. | Domingo 10:30 a.m. - 5:30 p.m.',
      features: ['Taller de ajustes express', 'Huerto urbano', 'Cicloruta con parqueadero seguro']
    }
  ];

  readonly services: { icon: string; title: string; body: string }[] = [
    {
      icon: '🧾',
      title: 'Recoge y cambia',
      body: 'Compra online y recoge en 2 horas. También puedes gestionar cambios o arreglos sin cita previa.'
    },
    {
      icon: '👗',
      title: 'Styling personalizado',
      body: 'Agenda una sesión privada con nuestras estilistas para crear outfits completos para toda la familia.'
    },
    {
      icon: '🎉',
      title: 'Eventos Dulce',
      body: 'Celebra cumpleaños, baby showers o talleres creativos en nuestras tiendas experiencia.'
    }
  ];
}