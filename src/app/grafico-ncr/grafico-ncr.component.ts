import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-grafico-ncr',
  templateUrl: './grafico-ncr.component.html',
  styleUrls: ['./grafico-ncr.component.css'],
})
/*export class GraficoNcrComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
*/
/*export class GraficoNcrComponent implements OnInit {
  public chart: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    // 1. Prepara las etiquetas y los valores
    const labels = [
      'Satisfactorio',
      'Insatisfactorio',
      'No Aplica',
      'Observado',
    ];
    const chartData = [
      this.data.satisfactorio,
      this.data.insatisfactorio,
      this.data.noAplica,
      this.data.observado,
    ];

    // 2. Define los colores para cada porción
    const colors = [
      'rgb(75, 192, 192)', // Satisfactorio (verde/cian)
      'rgb(255, 99, 132)', // Insatisfactorio (rojo)
      'rgb(255, 205, 86)', // No Aplica (amarillo)
      'rgb(54, 162, 235)', // Observado (azul)
    ];

    // 3. Crea el gráfico
    this.chart = new Chart('MyChart', {
      type: 'doughnut', // Puedes usar 'pie' para pastel o 'doughnut' para dona

      data: {
        labels: labels,
        datasets: [
          {
            label: 'Conteo de Preguntas',
            data: chartData,
            backgroundColor: colors,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 1, // Mantiene la relación de aspecto cuadrada
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Distribución de Resultados NCR',
            font: {
              size: 16,
            },
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    });
  }
}
*/
/*export class GraficoNcrComponent implements OnInit {
  public chart: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    // 1. Prepara las etiquetas y los valores
    const labels = [
      'Satisfactorio',
      'Insatisfactorio',
      'No Aplica',
      'Observado',
    ];
    const chartData = [
      this.data.satisfactorio,
      this.data.insatisfactorio,
      this.data.noAplica,
      this.data.observado,
    ];

    // 2. Define los colores (se usarán para las barras)
    const colors = [
      '#4CAF50', // Satisfactorio
      '#F44336', // Insatisfactorio
      '#9E9E9E', // No Aplica
      '#FF9800', // Observado
    ];

    // 3. Crea el gráfico
    this.chart = new Chart('MyChart', {
      type: 'pie', // <--- CAMBIO CLAVE: Usamos 'bar'

      data: {
        labels: labels,
        datasets: [
          {
            label: 'Conteo de Preguntas',
            data: chartData,
            backgroundColor: colors,
            // BorderWidth: 1 // Opcional
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Distribución de Resultados NCR',
            font: {
              size: 16,
            },
          },
          legend: {
            display: false, // La leyenda no es tan necesaria en barras simples
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Número de Items',
            },
            // Asegura que las etiquetas del eje Y sean números enteros si es necesario
            ticks: {
              precision: 0,
            },
          },
        },
      },
    });
  }
}
  <h2 mat-dialog-title>Grafico de Nivel de Cumplimiento Reglamentario</h2>

<mat-dialog-content>
  <div style="width: 400px; margin: auto">
    <canvas id="MyChart"></canvas>
  </div>
</mat-dialog-content>

<mat-dialog-actions align="end">
  <button mat-button mat-dialog-close>Cerrar</button>
</mat-dialog-actions>

*/
export class GraficoNcrComponent implements OnInit {
  public chart: any;
  // 1. Variable para almacenar el tipo seleccionado, inicializada en 'bar'
  public selectedChartType: string = 'bar';

  // 2. Lista de tipos de gráficos para el dropdown
  public chartTypes = [
    { value: 'bar', label: 'Barras' },
    { value: 'line', label: 'Líneas' },
    { value: 'pie', label: 'Pastel' },
    { value: 'doughnut', label: 'Dona' },
  ];

  //constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  constructor(
    public dialogRef: MatDialogRef<GraficoNcrComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.createChart();
  }

  // Método para redibujar el gráfico al cambiar el tipo
  changeChartType(newType: string) {
    this.selectedChartType = newType;
    // Destruye la instancia anterior para evitar duplicados
    if (this.chart) {
      this.chart.destroy();
    }
    this.createChart();
  }

  createChart() {
    // 1. Prepara las etiquetas y los valores
    const labels = [
      'Satisfactorio',
      'No Satisfactorio',
      'No Satisfactorio con PAC vigente',
      'No Aplica',
      'No Observado',
    ];
    const chartData = [
      this.data.satisfactorio,
      this.data.insatisfactorio,
      this.data.noSatifConPacVigente,
      this.data.noAplica,
      this.data.observado,
    ];

    // 2. Define los colores (se usarán para las barras/porciones)
    const colors = ['#4CAF50', '#F44336', '#3688f4ff', '#9E9E9E', '#FF9800'];

    // Lógica condicional para las opciones:
    const showScales =
      this.selectedChartType === 'bar' || this.selectedChartType === 'line';
    const showLegend =
      this.selectedChartType === 'pie' || this.selectedChartType === 'doughnut';

    // 3. Crea el gráfico
    this.chart = new Chart('MyChart', {
      type: this.selectedChartType as any, // <--- USO DE LA VARIABLE AQUÍ

      data: {
        labels: labels,
        datasets: [
          {
            label: 'Conteo de Preguntas',
            data: chartData,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Distribución de Resultados NCR',
            font: {
              size: 16,
            },
          },
          // La leyenda es más útil para gráficos de pastel/dona
          legend: {
            display: showLegend,
            position: 'bottom',
          },
        },
        // Los ejes (scales) solo se muestran para gráficos de barras y líneas
        scales: showScales
          ? {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Número de Items',
                },
                ticks: {
                  precision: 0,
                },
              },
            }
          : {}, // Si no son barras/líneas, pasamos un objeto vacío
      },
    });
  }
}
