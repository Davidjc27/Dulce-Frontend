import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Channel {
  icon: string;
  title: string;
  body: string;
  time: string;
}

interface Status {
  label: string;
  description: string;
  sla: string;
}

@Component({
  selector: 'app-consultar-pqr-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './consultar-pqr.component.html',
  styleUrls: ['../../info-shared.css', './consultar-pqr.component.css']
})
export class ConsultarPqrPageComponent {
  readonly channels: Channel[] = [
    {
      icon: '🌐',
      title: 'Portal Dulce',
      body: 'Ingresa con tu correo y consulta el estado en la sección "Mis solicitudes". Puedes agregar comentarios y adjuntar archivos.',
      time: 'Actualización en tiempo real'
    },
    {
      icon: '📨',
      title: 'Correo de seguimiento',
      body: 'Responde al correo donde recibiste tu número de caso. Toda la conversación queda registrada automáticamente.',
      time: 'Respuesta en menos de 6 horas hábiles'
    },
    {
      icon: '💬',
      title: 'Chat en vivo',
      body: 'Disponible de lunes a sábado de 8 a.m. a 8 p.m. Un agente te contará el avance y próximos pasos.',
      time: 'Tiempo promedio de atención: 3 minutos'
    }
  ];

  readonly statuses: Status[] = [
    {
      label: 'Recibido',
      description: 'Confirmamos los datos y asignamos un especialista según la categoría de tu solicitud.',
      sla: '0 a 4 horas'
    },
    {
      label: 'En gestión',
      description: 'Nuestro equipo analiza la solución. Podríamos contactarte para validar información adicional.',
      sla: 'Hasta 48 horas'
    },
    {
      label: 'Resuelto',
      description: 'Encontramos una respuesta y la compartimos por el mismo canal donde abriste la PQR.',
      sla: 'Dependiendo del caso'
    },
    {
      label: 'Cerrado',
      description: 'Confirmamos que estás satisfecho o programamos acciones complementarias si aún necesitas ayuda.',
      sla: 'Se registra cuando aceptas la solución'
    }
  ];

  readonly reminders: string[] = [
    'Guarda tu número de caso: comienza con las letras DL y seis dígitos.',
    'Si adjuntaste evidencias, verifica que no superen los 20 MB por archivo.',
    'Puedes reabrir la PQR dentro de los 5 días posteriores a recibir la solución si necesitas aclaraciones.'
  ];

  readonly tips: string[] = [
    'Activa las notificaciones push en el portal Dulce para recibir alertas apenas cambie el estado.',
    'Actualiza tus datos de contacto en el perfil para garantizar que podamos ubicarte sin demoras.',
    'Cuéntanos el contexto completo desde el inicio: esto reduce los tiempos de investigación en más de un 40%.'
  ];
}