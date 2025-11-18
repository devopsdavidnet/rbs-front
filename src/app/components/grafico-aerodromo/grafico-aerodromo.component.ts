import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartConfiguration, ChartType } from 'chart.js';

//import { FilaVerificacion } from '../../planificacion/planificacion.component';

export interface FilaVerificacion {
  lv: string;
  listaVerificacion: string;
  satisfactorio: number;
  insatisfactorio: number;
  noSatifConPacVigente: number;
  noAplica: number;
  noObservado: number;
  totalPreguntas: number;
}

@Component({
  selector: 'app-grafico-aerodromo',
  templateUrl: './grafico-aerodromo.component.html',
  styleUrls: ['./grafico-aerodromo.component.css'],
})
export class GraficoAerodromoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: FilaVerificacion) {}

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: this.data.listaVerificacion },
    },
  };

  public barChartType: ChartType = 'bar';

  public barChartData: ChartConfiguration['data'] = {
    labels: [
      'Satisfactorio',
      'Insatisfactorio',
      'No Satisfactorio con PAC Vigeten',
      'No aplica',
      'No Observado',
    ],
    datasets: [
      {
        data: [
          this.data.satisfactorio,
          this.data.insatisfactorio,
          this.data.noSatifConPacVigente,
          this.data.noAplica,
          this.data.noObservado,
        ],
        label: 'Resultados',
        backgroundColor: [
          '#4CAF50',
          '#F44336',
          '#3688f4ff',
          '#9E9E9E',
          '#FF9800',
        ],
      },
    ],
  };
}
