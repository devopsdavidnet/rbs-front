import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FilaVerificacion } from '../planificacion/planificacion.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetalleNcrComponent } from '../detalle-ncr/detalle-ncr.component';

export interface FilaVerifcacionItem {
  codigo: string;
  referencia: string;
  preguntaReglamento: string;
  constatacion: string;
  estadoCumplimiento: string;
  taxonomia: string;
  indiceRiesgo: string;
  categoria: string;
  accion: string;
}

@Component({
  selector: 'app-detalle-lv',
  templateUrl: './detalle-lv.component.html',
  styleUrls: ['./detalle-lv.component.css'],
})
export class DetalleLvComponent {
  constructor(
    public dialogRef: MatDialogRef<DetalleNcrComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    //this.resultadoNcr = this.calcularResultadoNcr(data);
  }

  // Columnas que se mostrarán y su orden
  dataSourceItems: FilaVerifcacionItem[] = [];

  dataPorItem: Record<string, FilaVerifcacionItem[]> = {
    LVAGA014: [
      {
        codigo: 'AGA - CAF -160',
        referencia: 'RAB 137 137.125',
        preguntaReglamento:
          '¿El operador de aeródromo notifica la resistencia de pavimentos de pista, calles de rodaje y plataforma?',
        constatacion:
          'No se notifica el PCR para los pavimentos (pista, calles de rodaje y plataforma).',
        estadoCumplimiento: 'SATISFACTORIO',
        taxonomia: 'TECH-TDA-02',
        indiceRiesgo: '2D',
        categoria: 'III',
        accion: 'NO DELIBERADO SISTEMÁTICO',
      },
      {
        codigo: 'AGA - CAF -160',
        referencia: 'RAB 137 137.125',
        preguntaReglamento:
          '¿El operador de aeródromo notifica la resistencia de pavimentos de pista, calles de rodaje y plataforma?',
        constatacion:
          'No se notifica el PCR para los pavimentos (pista, calles de rodaje y plataforma).',
        estadoCumplimiento: 'SATISFACTORIO',
        taxonomia: 'TECH-TDA-02',
        indiceRiesgo: '2D',
        categoria: 'III',
        accion: 'NO DELIBERADO SISTEMÁTICO',
      },
    ],
    LVAGA015: [
      {
        codigo: 'AGA - CAF -160',
        referencia: 'RAB 137 137.125',
        preguntaReglamento:
          '¿El operador de aeródromo notifica la resistencia de pavimentos de pista, calles de rodaje y plataforma?',
        constatacion:
          'No se notifica el PCR para los pavimentos (pista, calles de rodaje y plataforma).',
        estadoCumplimiento: 'SATISFACTORIO',
        taxonomia: 'TECH-TDA-02',
        indiceRiesgo: '2D',
        categoria: 'III',
        accion: 'NO DELIBERADO SISTEMÁTICO',
      },
      {
        codigo: 'AGA - COP -363',
        referencia: 'RAB 137 137.125',
        preguntaReglamento:
          '¿El operador de aeródromo realiza un control de potenciales obstáculos?',
        constatacion:
          'El plano OLS no contempla las áreas de expansión del Plan Maestro referidas a las ampliaciones de pista hacia el umbral 31.',
        estadoCumplimiento: 'SATISFACTORIO',
        taxonomia: 'TECH-TDA-02',
        indiceRiesgo: '2D',
        categoria: 'III',
        accion: 'NO DELIBERADO SISTEMÁTICO',
      },
    ],
    LVAGA016: [
      {
        codigo: 'AGA - CAF -160',
        referencia: 'RAB 137 137.125',
        preguntaReglamento:
          '¿El operador de aeródromo notifica la resistencia de pavimentos de pista, calles de rodaje y plataforma?',
        constatacion:
          'No se notifica el PCR para los pavimentos (pista, calles de rodaje y plataforma).',
        estadoCumplimiento: 'SATISFACTORIO',
        taxonomia: 'TECH-TDA-02',
        indiceRiesgo: '2D',
        categoria: 'III',
        accion: 'NO DELIBERADO SISTEMÁTICO',
      },
      {
        codigo: 'AGA - CAF -160',
        referencia: 'RAB 137 137.125',
        preguntaReglamento:
          '¿El operador de aeródromo notifica la resistencia de pavimentos de pista, calles de rodaje y plataforma?',
        constatacion:
          'No se notifica el PCR para los pavimentos (pista, calles de rodaje y plataforma).',
        estadoCumplimiento: 'SATISFACTORIO',
        taxonomia: 'TECH-TDA-02',
        indiceRiesgo: '2D',
        categoria: 'III',
        accion: 'NO DELIBERADO SISTEMÁTICO',
      },
    ],
  };
}
