import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chart } from 'chart.js/auto';
import { DetalleLvComponent } from '../detalle-lv/detalle-lv.component';
export interface FilaVerificacionItem {
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
  selector: 'app-grafico-riegos-taxonomia',
  templateUrl: './grafico-riegos-taxonomia.component.html',
  styleUrls: ['./grafico-riegos-taxonomia.component.css'],
})
export class GraficoRiegosTaxonomiaComponent {
  elementos: FilaVerificacionItem[] = [];

  dataPorItem: Record<string, FilaVerificacionItem[]> = {
    //LVAGA014 se tiene que llamar por aeródromo
    SLLP: [
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
        codigo: 'AGA - CAF -161',
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
        codigo: 'AGA - CAF -164',
        referencia: 'RAB 137 137.125',
        preguntaReglamento:
          '¿El operador de aeródromo notifica la resistencia de pavimentos de pista, calles de rodaje y plataforma?',
        constatacion:
          'No se notifica el PCR para los pavimentos (pista, calles de rodaje y plataforma).',
        estadoCumplimiento: 'SATISFACTORIO',
        taxonomia: 'TECH-TDA-03',
        indiceRiesgo: '4D',
        categoria: 'III',
        accion: 'NO DELIBERADO SISTEMÁTICO',
      },
      {
        codigo: 'AGA - CAF -165',
        referencia: 'RAB 137 137.125',
        preguntaReglamento:
          '¿El operador de aeródromo notifica la resistencia de pavimentos de pista, calles de rodaje y plataforma?',
        constatacion:
          'No se notifica el PCR para los pavimentos (pista, calles de rodaje y plataforma).',
        estadoCumplimiento: 'SATISFACTORIO',
        taxonomia: 'TECH-TDA-03',
        indiceRiesgo: '2D',
        categoria: 'III',
        accion: 'NO DELIBERADO SISTEMÁTICO',
      },

      {
        codigo: 'AGA - CAF -191',
        referencia: 'RAB 137 137.125',
        preguntaReglamento:
          '¿El operador de aeródromo notifica la resistencia de pavimentos de pista, calles de rodaje y plataforma?',
        constatacion:
          'No se notifica el PCR para los pavimentos (pista, calles de rodaje y plataforma).',
        estadoCumplimiento: 'SATISFACTORIO',
        taxonomia: 'TECH-TDA-192',
        indiceRiesgo: '2D',
        categoria: 'III',
        accion: 'NO DELIBERADO SISTEMÁTICO',
      },
      {
        codigo: 'AGA - COP -193',
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
      {
        codigo: 'AGA - CAF -260',
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
        codigo: 'AGA - CAF -261',
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
    SLVR: [
      {
        codigo: 'AGA - CAF -260',
        referencia: 'RAB 138 137.125',
        preguntaReglamento:
          '¿El operador de aeródromo notifica la resistencia de pavimentos de pista, calles de rodaje y plataforma?',
        constatacion:
          'No se notifica el PCR para los pavimentos (pista, calles de rodaje y plataforma).',
        estadoCumplimiento: 'NO SATISFACTORIO',
        taxonomia: 'TECH-TDA-03',
        indiceRiesgo: '3D',
        categoria: 'III',
        accion: 'NO DELIBERADO SISTEMÁTICO',
      },
      {
        codigo: 'AGA - CAF -261',
        referencia: 'RAB 137 137.125',
        preguntaReglamento:
          '¿El operador de aeródromo notifica la resistencia de pavimentos de pista, calles de rodaje y plataforma?',
        constatacion:
          'No se notifica el PCR para los pavimentos (pista, calles de rodaje y plataforma).',
        estadoCumplimiento: 'SATISFACTORIO',
        taxonomia: 'TECH-TDA-03',
        indiceRiesgo: '2D',
        categoria: 'III',
        accion: 'NO DELIBERADO SISTEMÁTICO',
      },
      {
        codigo: 'AGA - CAF -261',
        referencia: 'RAB 137 137.125',
        preguntaReglamento:
          '¿El operador de aeródromo notifica la resistencia de pavimentos de pista, calles de rodaje y plataforma?',
        constatacion:
          'No se notifica el PCR para los pavimentos (pista, calles de rodaje y plataforma).',
        estadoCumplimiento: 'NO SATISFACTORIO',
        taxonomia: 'TECH-TDA-03',
        indiceRiesgo: '3D',
        categoria: 'III',
        accion: 'NO DELIBERADO SISTEMÁTICO',
      },
      {
        codigo: 'AGA - CAF -260',
        referencia: 'RAB 138 137.125',
        preguntaReglamento:
          '¿El operador de aeródromo notifica la resistencia de pavimentos de pista, calles de rodaje y plataforma?',
        constatacion:
          'No se notifica el PCR para los pavimentos (pista, calles de rodaje y plataforma).',
        estadoCumplimiento: 'NO SATISFACTORIO',
        taxonomia: 'TECH-TDA-05',
        indiceRiesgo: '3D',
        categoria: 'III',
        accion: 'NO DELIBERADO SISTEMÁTICO',
      },
      {
        codigo: 'AGA - CAF -261',
        referencia: 'RAB 137 137.125',
        preguntaReglamento:
          '¿El operador de aeródromo notifica la resistencia de pavimentos de pista, calles de rodaje y plataforma?',
        constatacion:
          'No se notifica el PCR para los pavimentos (pista, calles de rodaje y plataforma).',
        estadoCumplimiento: 'SATISFACTORIO',
        taxonomia: 'TECH-TDA-03',
        indiceRiesgo: '4D',
        categoria: 'III',
        accion: 'NO DELIBERADO SISTEMÁTICO',
      },
    ],
  };

  //  constructor(@Inject(MAT_DIALOG_DATA) public data: { codigo: string }) {}

  constructor(
    public dialogRef: MatDialogRef<DetalleLvComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { codigo: string }
  ) {}

  ngOnInit() {
    const codigo = this.data.codigo.trim().toUpperCase();
    this.elementos = this.dataPorItem[codigo] ?? [];

    this.graficoTaxonomia();
    this.graficoIndiceRiesgo();
  }

  graficoTaxonomia() {
    const totales: Record<string, number> = {};

    this.elementos.forEach((item) => {
      totales[item.taxonomia] = (totales[item.taxonomia] || 0) + 1;
    });

    /*new Chart('chartTaxonomia', {
      type: 'bar',
      data: {
        labels: Object.keys(totales),
        datasets: [
          {
            label: 'Frecuencia por Taxonomía',
            data: Object.values(totales),
            backgroundColor: ['#eb1919ff', '#ff9800', '#f5f374ff', '#1976d2'],

            //backgroundColor: ['red', 'blue', 'green'],
            //borderColor: 'black',
          },
        ],
      },
    });*/

    new Chart('chartTaxonomia', {
      type: 'bar',
      data: {
        labels: Object.keys(totales),
        datasets: [
          {
            label: 'Frecuencia por Taxonomía',
            data: Object.values(totales),
            backgroundColor: ['#eb1919ff', '#ff9800', '#f5f374ff', '#1976d2'],
          },
        ],
      },
      options: {
        indexAxis: 'y', // ← ←  HORIZONTAL
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }

  graficoIndiceRiesgo() {
    const totales: Record<string, number> = {};

    this.elementos.forEach((item) => {
      totales[item.indiceRiesgo] = (totales[item.indiceRiesgo] || 0) + 1;
    });

    new Chart('chartIndice', {
      type: 'pie',
      data: {
        labels: Object.keys(totales),
        datasets: [
          {
            label: 'Índice de Riesgo',
            data: Object.values(totales),
            backgroundColor: ['#eb1919ff', '#ff9800', '#f5f374ff', '#1976d2'],
          },
        ],
      },
    });
  }
}
