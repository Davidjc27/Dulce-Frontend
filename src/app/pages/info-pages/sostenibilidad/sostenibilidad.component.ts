
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Initiative {
  icon: string;
  title: string;
  body: string;
}

interface Metric {
  value: string;
  label: string;
}

@Component({
  selector: 'app-sostenibilidad-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './sostenibilidad.component.html',
  styleUrls: ['../info-shared.css', './sostenibilidad.component.css']
})
export class SostenibilidadPageComponent {
  readonly initiatives: Initiative[] = [
    {
      icon: '🌱',
      title: 'Materias primas responsables',
      body: 'El 70% de nuestras telas son fibras recicladas o algodón orgánico. Trabajamos con proveedores certificados GOTS y Recycled Claim.'
    },
    {
      icon: '🌊',
      title: 'Tintorería consciente',
      body: 'Utilizamos tintes a base de agua y procesos con consumo controlado. El 85% del agua se trata y reutiliza.'
    },
    {
      icon: '⚡',
      title: 'Energía renovable',
      body: 'Nuestros talleres funcionan con paneles solares y energía eólica, reduciendo un 48% las emisiones de CO₂.'
    },
    {
      icon: '🎗️',
      title: 'Economía circular',
      body: 'Recolectamos prendas Dulce usadas para repararlas, donarlas o transformarlas en nuevos tejidos.'
    }
  ];

  readonly metrics: Metric[] = [
    { value: '35.000L', label: 'de agua ahorrados al mes' },
    { value: '2.5T', label: 'de textiles reciclados en 2024' },
    { value: '92%', label: 'de residuos aprovechados' },
    { value: '1.200', label: 'familias impactadas con programas sociales' }
  ];

  readonly commitments: { title: string; description: string }[] = [
    {
      title: 'Transparencia total',
      description: 'Publicamos reportes trimestrales con la trazabilidad de cada colección y certificaciones actualizadas.'
    },
    {
      title: 'Moda lenta',
      description: 'Colecciones limitadas, atemporales y duraderas para promover el consumo consciente.'
    },
    {
      title: 'Innovación colaborativa',
      description: 'Trabajamos con universidades y startups para prototipar fibras biodegradables y empaques compostables.'
    }
  ];
}