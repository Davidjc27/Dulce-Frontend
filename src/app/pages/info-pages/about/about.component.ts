import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Highlight {
  icon: string;
  text: string;
}

interface ValueCard {
  icon: string;
  title: string;
  body: string;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './about.component.html',
  styleUrls: ['../info-shared.css', './about.component.css']
})
export class AboutPageComponent {
  readonly highlights: Highlight[] = [
    { icon: '✨', text: '13 años creando moda consciente' },
    { icon: '🧵', text: 'Talleres certificados en Bogotá y Medellín' },
    { icon: '🤝', text: 'Red de más de 120 artesanas aliadas' },
    { icon: '♻️', text: '70% de nuestras telas son recicladas o orgánicas' }
  ];

  readonly values: ValueCard[] = [
    {
      icon: '💡',
      title: 'Creatividad con propósito',
      body: 'Cada colección nace del diálogo con nuestra comunidad. Diseñamos prendas que cuentan historias reales y celebran la autenticidad.'
    },
    {
      icon: '🌿',
      title: 'Responsabilidad en cada paso',
      body: 'Seleccionamos materiales certificados y optimizamos nuestros procesos para reducir desperdicios y huella hídrica.'
    },
    {
      icon: '🪡',
      title: 'Talento local',
      body: 'Trabajamos con cooperativas de mujeres cabezas de hogar, brindándoles formación continua y condiciones justas.'
    },
    {
      icon: '💞',
      title: 'Experiencias memorables',
      body: 'Más allá de vestir, buscamos crear momentos dulces con eventos, talleres y experiencias personalizadas en tienda.'
    }
  ];

  readonly timeline: TimelineItem[] = [
    {
      year: '2012',
      title: 'Nace Dulce',
      description: 'Abrimos nuestro primer taller en Cali con un equipo de cuatro soñadoras dispuestas a transformar la moda infantil.'
    },
    {
      year: '2016',
      title: 'Colección eco',
      description: 'Lanzamos la primera línea elaborada con algodón orgánico certificado y tintes a base de agua.'
    },
    {
      year: '2019',
      title: 'Expansión nacional',
      description: 'Inauguramos tiendas experiencia en Bogotá, Medellín y Barranquilla con espacios lúdicos para toda la familia.'
    },
    {
      year: '2024',
      title: 'Dulce Lab',
      description: 'Creamos un laboratorio creativo abierto donde co-creamos piezas en colaboración con artistas y clientes.'
    }
  ];
}