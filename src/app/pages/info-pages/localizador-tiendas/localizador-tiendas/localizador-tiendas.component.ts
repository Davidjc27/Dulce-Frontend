
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Store {
  city: string;
  name: string;
  address: string;
  schedule: string;
  services: string[];
  phone: string;
}

interface MapPoint {
  label: string;
  area: string;
}

interface SocialIcon {
  icon: string;
  label: string;
}

@Component({
  selector: 'app-localizador-tiendas-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './localizador-tiendas.component.html',
  styleUrls: ['../../info-shared.css', './localizador-tiendas.component.css']
})
export class LocalizadorTiendasPageComponent {
  readonly stores: Store[] = [
    {
      city: 'Bogotá',
      name: 'Zona T - Flagship',
      address: 'Cra. 13A #85-12',
      schedule: 'Lunes a domingo 10:00 a.m. - 8:00 p.m.',
      services: ['Estudio de estilo', 'Pick up online', 'Arreglos básicos en 24h'],
      phone: '601 489 7070'
    },
    {
      city: 'Medellín',
      name: 'Centro Comercial El Tesoro',
      address: 'Carrera 25A #1A Sur - 45, nivel 2',
      schedule: 'Lunes a sábado 10:00 a.m. - 9:00 p.m. | Domingo 11:00 a.m. - 8:00 p.m.',
      services: ['Probadores inteligentes', 'Eventos after office', 'Personal shopper'],
      phone: '604 604 3434'
    },
    {
      city: 'Cali',
      name: 'Gran Boulevard',
      address: 'Av. 8N #21-36',
      schedule: 'Lunes a sábado 9:30 a.m. - 8:30 p.m. | Domingo 10:00 a.m. - 7:00 p.m.',
      services: ['Experiencia cafetera', 'Zona kids', 'Recogida y devoluciones'],
      phone: '602 380 9090'
    }
  ];

  readonly mapPoints: MapPoint[] = [
    { label: 'Zona norte', area: 'Usaquén, Chicó, Cedritos' },
    { label: 'Zona centro', area: 'Chapinero, Centro Internacional, Teusaquillo' },
    { label: 'Zona occidente', area: 'Modelia, Hayuelos, Fontibón' }
  ];

  readonly tips: string[] = [
    'Activa tu ubicación para recomendarte la tienda más cercana con inventario disponible.',
    'Reserva un turno en probadores desde la app y evita filas en horas pico.',
    'Consulta eventos especiales de temporada y talleres personalizados desde la agenda Dulce.'
  ];

  readonly socialIcons: SocialIcon[] = [
    { icon: '', label: 'Facebook' },
    { icon: '', label: 'Instagram' },
    { icon: '', label: 'YouTube' },
    { icon: '', label: 'TikTok' }
  ];
}
