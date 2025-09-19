import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface SizeRow {
  size: string;
  bust: string;
  waist: string;
  hip: string;
}

interface SizeGuide {
  title: string;
  rows: SizeRow[];
  note: string;
}

@Component({
  selector: 'app-guia-tallas-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './guia-tallas.component.html',
  styleUrls: ['../info-shared.css', './guia-tallas.component.css']
})
export class GuiaTallasPageComponent {
  readonly guides: SizeGuide[] = [
    {
      title: 'Dama',
      note: 'Medidas en centímetros. Las prendas Dulce tienen silueta semi-ajustada y telas con elongación suave.',
      rows: [
        { size: 'XS', bust: '82 - 86', waist: '62 - 66', hip: '88 - 92' },
        { size: 'S', bust: '86 - 90', waist: '66 - 70', hip: '92 - 96' },
        { size: 'M', bust: '90 - 96', waist: '70 - 76', hip: '96 - 102' },
        { size: 'L', bust: '96 - 102', waist: '76 - 82', hip: '102 - 108' },
        { size: 'XL', bust: '102 - 108', waist: '82 - 90', hip: '108 - 116' }
      ]
    },
    {
      title: 'Niña',
      note: 'Medidas aproximadas para niñas entre 4 y 14 años. Recomendamos elegir según estatura.',
      rows: [
        { size: '4', bust: '56 - 59', waist: '52 - 54', hip: '58 - 62' },
        { size: '6', bust: '59 - 63', waist: '54 - 56', hip: '62 - 66' },
        { size: '8', bust: '63 - 68', waist: '56 - 59', hip: '66 - 72' },
        { size: '10', bust: '68 - 73', waist: '59 - 62', hip: '72 - 78' },
        { size: '12', bust: '73 - 78', waist: '62 - 65', hip: '78 - 84' },
        { size: '14', bust: '78 - 83', waist: '65 - 68', hip: '84 - 90' }
      ]
    }
  ];

  readonly tips: { icon: string; title: string; body: string }[] = [
    {
      icon: '📏',
      title: 'Mide sobre ropa ajustada',
      body: 'Toma las medidas con una cinta métrica sobre una camiseta delgada para mayor precisión.'
    },
    {
      icon: '🤸‍♀️',
      title: 'Piensa en el movimiento',
      body: 'Si te gusta mayor libertad elige una talla arriba. Para prendas stretch, la talla sugerida irá perfecta.'
    },
    {
      icon: '🧼',
      title: 'Cuida el lavado',
      body: 'Las fibras naturales pueden contraerse ligeramente. Lava con agua fría y seca a la sombra.'
    }
  ];
}