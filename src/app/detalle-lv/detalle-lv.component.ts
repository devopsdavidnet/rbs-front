import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

// --- 1. Definición de la Interfaz ---
export interface AuditoriaAerodromo {
  referencia: string;
  preguntaReglamento: string;
  orientacionEvaluacion: string;
  estadoCumplimiento:
    | 'Satisfactorio'
    | 'Insatisfactorio'
    | 'No aplica'
    | 'No observado'
    | 'Seleccione cumplimiento';
  indiceRiesgo: string;
}

// --- 2. Definición de los Datos Constantes ---
export const DATOS_AERODROMO: AuditoriaAerodromo[] = [
  {
    referencia: 'RAB 137.101',
    preguntaReglamento:
      '¿El operador de aeródromo proporciona los datos sobre el aeródromo de acuerdo a los requisitos establecidos?',
    orientacionEvaluacion:
      'Verificar que el operador tiene establecido un proceso para la determinación y notificación de datos de aeródromo. Verificar que el procedimiento prevé que la determinación y notificación se efectúen conforme a la clasificación de aptitud e integridad que se requiera.  ',
    estadoCumplimiento: 'Satisfactorio',
    indiceRiesgo: '',
  },
  {
    referencia: 'RAB 137.105',
    preguntaReglamento:
      '¿El aeródromo notifica el punto de referencia del aeródromo?',
    orientacionEvaluacion:
      'Verificar que: Se ha establecido un ARP. El operador de aeródromo ha determinado la ubicación del ARP y lo ha notificado al AIS, en grados, minutos y segundos.',
    estadoCumplimiento: 'Insatisfactorio',
    indiceRiesgo: '5D',
  },
  {
    referencia: 'RAB 137.105',
    preguntaReglamento:
      '¿El aeródromo notifica las elevaciones del aeródromo y de la pista?',
    orientacionEvaluacion:
      'Examinar pruebas documentales de que el operador de aeródromo ha determinado y notificado al AIS: La elevación del aeródromo. La elevación de cada extremo de pista... (continuación)',
    estadoCumplimiento: 'Satisfactorio',
    indiceRiesgo: '',
  },
];

@Component({
  selector: 'app-detalle-lv',
  templateUrl: './detalle-lv.component.html',
  styleUrls: ['./detalle-lv.component.css'],
})
export class DetalleLvComponent implements OnInit {
  // Columnas que se mostrarán y su orden
  displayedColumns: string[] = [
    'referencia',
    'preguntaReglamento',
    'orientacionEvaluacion',
    'estadoCumplimiento',
    'indiceRiesgo',
  ];

  // Fuente de datos para la MatTable
  dataSource = new MatTableDataSource<AuditoriaAerodromo>(DATOS_AERODROMO);

  // Opciones del select para el estado de cumplimiento
  opcionesCumplimiento = [
    'Satisfactorio',
    'Insatisfactorio',
    'No aplica',
    'No observado',
  ];

  constructor() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // Método para manejar el cambio en el select (opcional)
  onEstadoChange(element: AuditoriaAerodromo, nuevoEstado: string): void {
    console.log(`Fila ${element.referencia} cambió a: ${nuevoEstado}`);
    // Aquí puedes implementar la lógica para actualizar el dato
    element.estadoCumplimiento = nuevoEstado as any;
  }
}
