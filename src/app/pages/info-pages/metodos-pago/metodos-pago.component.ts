import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface PaymentOption {
  icon: string;
  title: string;
  body: string;
}

@Component({
  selector: 'app-metodos-pago-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './metodos-pago.component.html',
  styleUrls: ['../info-shared.css', './metodos-pago.component.css']
})
export class MetodosPagoPageComponent {
  readonly options: PaymentOption[] = [
    { icon: '💳', title: 'Tarjetas débito y crédito', body: 'Visa, Mastercard, American Express y tarjetas débito nacionales con autenticación 3D Secure.' },
    { icon: '🏦', title: 'Transferencias PSE', body: 'Conecta con tu banco en segundos y realiza pagos seguros sin costo adicional.' },
    { icon: '📱', title: 'Billeteras digitales', body: 'Nequi, Daviplata, Apple Pay y Google Pay disponibles en checkout.' },
    { icon: '💸', title: 'Pago contraentrega', body: 'Disponible en Bogotá, Medellín, Cali, Barranquilla y Bucaramanga para pedidos hasta $400.000.' }
  ];

  readonly financing = [
    {
      title: 'Compra ahora, paga después',
      description: 'Financiación con Addi a 3 o 6 cuotas sin papeles. Respuesta inmediata desde el checkout.'
    },
    {
      title: 'Crédito Dulce',
      description: 'Solicítalo en tienda con tu cédula. Cupos desde $200.000 y plazos hasta 12 meses.'
    },
    {
      title: 'Empresas aliadas',
      description: 'Descuentos y convenios para compras corporativas con facturación electrónica.'
    }
  ];
}