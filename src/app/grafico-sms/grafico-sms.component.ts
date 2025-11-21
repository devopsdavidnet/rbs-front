import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface FilaVerificacionSms {
  item: number;
  codigoComponente: number;
  componente: string;
  codigoElemento: number;
  elemento: string;
  indicadorCumplimiento: string;
  eficacia: string;
  valorEficacia: number;
}

@Component({
  selector: 'app-grafico-sms',
  templateUrl: './grafico-sms.component.html',
  styleUrls: ['./grafico-sms.component.css'],
})
export class GraficoSmsComponent implements OnInit {
  dataSourceSms: FilaVerificacionSms[] = [];
  dataPorAerodromoSms: Record<string, FilaVerificacionSms[]> = {
    SLLP: [
      {
        item: 1,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.1,
        elemento: 'Identificación de peligros (E2.1)',
        indicadorCumplimiento:
          'Existe un sistema de notificación confidencial, que captura los errores, peligros y cuasicolisiones, que es fácil de usar y accesible a todo el personal.',
        eficacia: 'O',
        valorEficacia: 2.76,
      },
      {
        item: 2,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.1,
        elemento: 'Identificación de peligros (E2.1)',
        indicadorCumplimiento:
          'El sistema de notificación confidencial brinda retroalimentación a la persona que notifica sobre las medidas adoptadas (o no adoptadas) y, cuando sea adecuado, al resto de la organización.',
        eficacia: 'O',
        valorEficacia: 2.07,
      },
      {
        item: 3,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.1,
        elemento: 'Identificación de peligros (E2.1)',
        indicadorCumplimiento:
          'El personal expresa su confianza en la política y en los procesos de notificación de la organización.',
        eficacia: 'O',
        valorEficacia: 1.38,
      },
      {
        item: 4,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.1,
        elemento: 'Identificación de peligros (E2.1)',
        indicadorCumplimiento:
          'El personal expresa su confianza en la política y en los procesos de notificación de la organización.',
        eficacia: 'O',
        valorEficacia: 2.76,
      },
      {
        item: 5,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.1,
        elemento: 'Identificación de peligros (E2.1)',
        indicadorCumplimiento:
          'El proceso de identificación de peligros identifica los peligros relacionados con la actuación humana.',
        eficacia: 'O',
        valorEficacia: 2.76,
      },
      {
        item: 6,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.1,
        elemento: 'Identificación de peligros (E2.1)',
        indicadorCumplimiento:
          'Existe un proceso para analizar los datos y la información sobre seguridad operacional para buscar tendencias y obtener información de gestión utilizable.',
        eficacia: 'O',
        valorEficacia: 2.76,
      },
      {
        item: 7,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.1,
        elemento: 'Identificación de peligros (E2.1)',
        indicadorCumplimiento:
          'Las investigaciones sobre seguridad operacional son realizadas por personal debidamente capacitado para identificar las causas de fondo (no sólo lo que sucedió, sino por qué sucedió).',
        eficacia: 'O',
        valorEficacia: 2.76,
      },
      {
        item: 8,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.2,
        elemento:
          'Evaluación y mitigación de los riesgos de seguridad operacional (E2.2)',
        indicadorCumplimiento:
          'Existe un proceso para la gestión de riesgos que incluye el análisis y evaluación de los riesgos asociados con los peligros identificados, expresado en términos de probabilidad y gravedad (o alguna metodología alternativa).',
        eficacia: 'O',
        valorEficacia: 2.76,
      },
      {
        item: 9,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.2,
        elemento:
          'Evaluación y mitigación de los riesgos de seguridad operacional (E2.2)',
        indicadorCumplimiento:
          'Hay criterios para evaluar el nivel de riesgo que la organización está dispuesta a aceptar, y las evaluaciones y clasificaciones de riesgos están debidamente justificadas.',
        eficacia: 'O',
        valorEficacia: 2.07,
      },
      {
        item: 10,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.2,
        elemento:
          'Evaluación y mitigación de los riesgos de seguridad operacional (E2.2)',
        indicadorCumplimiento:
          'La organización cuenta con un proceso para tomar decisiones y aplicar controles de riesgo adecuados y eficaces.',
        eficacia: 'O',
        valorEficacia: 2.07,
      },
      {
        item: 11,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.2,
        elemento:
          'Evaluación y mitigación de los riesgos de seguridad operacional (E2.2)',
        indicadorCumplimiento:
          'La alta gerencia tiene visibilidad de los peligros cuyo riesgo asociado es alto o medio, así como de su mitigación y control.',
        eficacia: 'O',
        valorEficacia: 2.07,
      },
      {
        item: 12,
        codigoComponente: 2,
        componente: 'Aseguramiento de la seguridad operacional (C3)',
        codigoElemento: 2.1,
        elemento:
          'Observación y medición del rendimiento en materia de la seguridad operacional (E3.1)',
        indicadorCumplimiento:
          'Los indicadores de rendimiento en materia de seguridad operacional (SPI) relacionados con los objetivos de seguridad operacional de la organización han sido definidos, promulgados y son observados y analizados para buscar tendencias..',
        eficacia: 'S',
        valorEficacia: 1.63,
      },
      {
        item: 13,
        codigoComponente: 2,
        componente: 'Aseguramiento de la seguridad operacional (C3)',
        codigoElemento: 2.1,
        elemento:
          'Observación y medición del rendimiento en materia de la seguridad operacional (E3.1)',
        indicadorCumplimiento:
          'Los controles y mitigaciones de los riesgos se verifican/auditan para confirmar que están funcionando y son eficaces.',
        eficacia: 'O',
        valorEficacia: 2.76,
      },
      {
        item: 14,
        codigoComponente: 2,
        componente: 'Aseguramiento de la seguridad operacional (C3)',
        codigoElemento: 2.1,
        elemento:
          'Observación y medición del rendimiento en materia de la seguridad operacional (E3.1)',
        indicadorCumplimiento:
          'El aseguramiento de la seguridad operacional toma en cuenta las actividades llevadas a cabo por todas las organizaciones directamente contratadas.',
        eficacia: 'O',
        valorEficacia: 2.07,
      },
      {
        item: 15,
        codigoComponente: 2,
        componente: 'Aseguramiento de la seguridad operacional (C3)',
        codigoElemento: 2.1,
        elemento:
          'Observación y medición del rendimiento en materia de la seguridad operacional (E3.1)',
        indicadorCumplimiento:
          'Se define las responsabilidades y la obligación de rendición de cuentas para garantizar el cumplimiento de las normas de la seguridad operacional y se identifica claramente los requisitos aplicables en los manuales y procedimientos de la organización.',
        eficacia: 'S',
        valorEficacia: 1.22,
      },
      {
        item: 19,
        codigoComponente: 2,
        componente: 'Aseguramiento de la seguridad operacional (C3)',
        codigoElemento: 2.2,
        elemento: 'La gestión del cambio (E3.2).',
        indicadorCumplimiento:
          'La organización cuenta con un proceso para identificar si los cambios tienen un impacto en la seguridad operacional, así como para gestionar los riesgos identificados de acuerdo con los procesos de gestión de riesgos de seguridad operacional existentes.',
        eficacia: 'S',
        valorEficacia: 1.22,
      },
      {
        item: 20,
        codigoComponente: 2,
        componente: 'Aseguramiento de la seguridad operacional (C3)',
        codigoElemento: 2.2,
        elemento: 'La gestión del cambio (E3.2).',
        indicadorCumplimiento:
          'Las cuestiones relativas a los factores humanos (HF) se han considerado como parte del proceso de gestión del cambio y, donde corresponde, la organización ha aplicado las normas de diseño adecuadas, centradas en el factor humano, para el diseño de los equipos y el entorno físico.',
        eficacia: 'S',
        valorEficacia: 0.81,
      },
      {
        item: 21,
        codigoComponente: 2,
        componente: 'Aseguramiento de la seguridad operacional (C3)',
        codigoElemento: 2.3,
        elemento: 'Mejora continua del SMS (E3.3).',
        indicadorCumplimiento:
          'La organización supervisa y evalúa continuamente sus procesos de SMS para mantener o mejorar continuamente la eficacia total del SMS.',
        eficacia: 'O',
        valorEficacia: 1.38,
      },
      {
        item: 22,
        codigoComponente: 3,
        componente: 'Políticas y objetivos de la seguridad operacional (C1).',
        codigoElemento: 3.1,
        elemento: 'Compromiso de gestión (E 1.1)',
        indicadorCumplimiento:
          'Existe una política de seguridad operacional, firmada por el Gerente Responsable, que incluye un compromiso hacia la mejora continua; cumple con todos los requisitos y normas legales aplicables; y toma en consideración las mejores prácticas.',
        eficacia: 'S',
        valorEficacia: 0.41,
      },
      {
        item: 23,
        codigoComponente: 3,
        componente: 'Políticas y objetivos de la seguridad operacional (C1).',
        codigoElemento: 3.1,
        elemento: 'Compromiso de gestión (E 1.1)',
        indicadorCumplimiento:
          'La política de seguridad operacional incluye una declaración para proporcionar los recursos adecuados, y la organización está gestionándolos con el objetivo de anticipar y subsanar cualquier deficiencia.',
        eficacia: 'S',
        valorEficacia: 0.41,
      },
      {
        item: 41,
        codigoComponente: 4,
        componente: 'Promoción de la seguridad operacional (C4)',
        codigoElemento: 4.1,
        elemento: 'Instrucción y educación (E4.1)',
        indicadorCumplimiento:
          'Existe un programa de instrucción en SMS que incluye instrucción inicial y recurrente. La instrucción cubre las tareas de seguridad operacional individuales (incluyendo roles, responsabilidades y obligación de rendición de cuentas) y cómo funciona el SMS de la organización.',
        eficacia: 'O',
        valorEficacia: 2.76,
      },
      {
        item: 42,
        codigoComponente: 4,
        componente: 'Promoción de la seguridad operacional (C4)',
        codigoElemento: 4.1,
        elemento: 'Instrucción y educación (E4.1)',
        indicadorCumplimiento:
          'Hay un proceso en vigor para medir la eficacia de la instrucción y para adoptar las medidas adecuadas para mejorar la instrucción posterior.',
        eficacia: 'O',
        valorEficacia: 2.07,
      },
    ],
    SLVR: [
      {
        item: 1,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.1,
        elemento: 'Identificación de peligros (E2.1)',
        indicadorCumplimiento:
          'Existe un sistema de notificación confidencial, que captura los errores, peligros y cuasicolisiones, que es fácil de usar y accesible a todo el personal.',
        eficacia: 'O',
        valorEficacia: 2.76,
      },
      {
        item: 2,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.1,
        elemento: 'Identificación de peligros (E2.1)',
        indicadorCumplimiento:
          'El sistema de notificación confidencial brinda retroalimentación a la persona que notifica sobre las medidas adoptadas (o no adoptadas) y, cuando sea adecuado, al resto de la organización.',
        eficacia: 'O',
        valorEficacia: 2.07,
      },
      {
        item: 3,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.1,
        elemento: 'Identificación de peligros (E2.1)',
        indicadorCumplimiento:
          'El personal expresa su confianza en la política y en los procesos de notificación de la organización.',
        eficacia: 'O',
        valorEficacia: 1.38,
      },
      {
        item: 4,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.1,
        elemento: 'Identificación de peligros (E2.1)',
        indicadorCumplimiento:
          'El personal expresa su confianza en la política y en los procesos de notificación de la organización.',
        eficacia: 'O',
        valorEficacia: 2.76,
      },
      {
        item: 5,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.1,
        elemento: 'Identificación de peligros (E2.1)',
        indicadorCumplimiento:
          'El proceso de identificación de peligros identifica los peligros relacionados con la actuación humana.',
        eficacia: 'O',
        valorEficacia: 2.76,
      },
      {
        item: 6,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.1,
        elemento: 'Identificación de peligros (E2.1)',
        indicadorCumplimiento:
          'Existe un proceso para analizar los datos y la información sobre seguridad operacional para buscar tendencias y obtener información de gestión utilizable.',
        eficacia: 'O',
        valorEficacia: 2.76,
      },
      {
        item: 7,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.1,
        elemento: 'Identificación de peligros (E2.1)',
        indicadorCumplimiento:
          'Las investigaciones sobre seguridad operacional son realizadas por personal debidamente capacitado para identificar las causas de fondo (no sólo lo que sucedió, sino por qué sucedió).',
        eficacia: 'O',
        valorEficacia: 2.76,
      },
      {
        item: 8,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.2,
        elemento:
          'Evaluación y mitigación de los riesgos de seguridad operacional (E2.2)',
        indicadorCumplimiento:
          'Existe un proceso para la gestión de riesgos que incluye el análisis y evaluación de los riesgos asociados con los peligros identificados, expresado en términos de probabilidad y gravedad (o alguna metodología alternativa).',
        eficacia: 'O',
        valorEficacia: 2.76,
      },
      {
        item: 9,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.2,
        elemento:
          'Evaluación y mitigación de los riesgos de seguridad operacional (E2.2)',
        indicadorCumplimiento:
          'Hay criterios para evaluar el nivel de riesgo que la organización está dispuesta a aceptar, y las evaluaciones y clasificaciones de riesgos están debidamente justificadas.',
        eficacia: 'O',
        valorEficacia: 2.07,
      },
      {
        item: 10,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.2,
        elemento:
          'Evaluación y mitigación de los riesgos de seguridad operacional (E2.2)',
        indicadorCumplimiento:
          'La organización cuenta con un proceso para tomar decisiones y aplicar controles de riesgo adecuados y eficaces.',
        eficacia: 'O',
        valorEficacia: 2.07,
      },
      {
        item: 11,
        codigoComponente: 1,
        componente: 'Gestión de riesgos de la seguridad operacional (C2)',
        codigoElemento: 1.2,
        elemento:
          'Evaluación y mitigación de los riesgos de seguridad operacional (E2.2)',
        indicadorCumplimiento:
          'La alta gerencia tiene visibilidad de los peligros cuyo riesgo asociado es alto o medio, así como de su mitigación y control.',
        eficacia: 'O',
        valorEficacia: 2.07,
      },
      {
        item: 12,
        codigoComponente: 2,
        componente: 'Aseguramiento de la seguridad operacional (C3)',
        codigoElemento: 2.1,
        elemento:
          'Observación y medición del rendimiento en materia de la seguridad operacional (E3.1)',
        indicadorCumplimiento:
          'Los indicadores de rendimiento en materia de seguridad operacional (SPI) relacionados con los objetivos de seguridad operacional de la organización han sido definidos, promulgados y son observados y analizados para buscar tendencias..',
        eficacia: 'S',
        valorEficacia: 1.63,
      },
      {
        item: 13,
        codigoComponente: 2,
        componente: 'Aseguramiento de la seguridad operacional (C3)',
        codigoElemento: 2.1,
        elemento:
          'Observación y medición del rendimiento en materia de la seguridad operacional (E3.1)',
        indicadorCumplimiento:
          'Los controles y mitigaciones de los riesgos se verifican/auditan para confirmar que están funcionando y son eficaces.',
        eficacia: 'O',
        valorEficacia: 2.76,
      },
      {
        item: 14,
        codigoComponente: 2,
        componente: 'Aseguramiento de la seguridad operacional (C3)',
        codigoElemento: 2.1,
        elemento:
          'Observación y medición del rendimiento en materia de la seguridad operacional (E3.1)',
        indicadorCumplimiento:
          'El aseguramiento de la seguridad operacional toma en cuenta las actividades llevadas a cabo por todas las organizaciones directamente contratadas.',
        eficacia: 'O',
        valorEficacia: 2.07,
      },
      {
        item: 15,
        codigoComponente: 2,
        componente: 'Aseguramiento de la seguridad operacional (C3)',
        codigoElemento: 2.1,
        elemento:
          'Observación y medición del rendimiento en materia de la seguridad operacional (E3.1)',
        indicadorCumplimiento:
          'Se define las responsabilidades y la obligación de rendición de cuentas para garantizar el cumplimiento de las normas de la seguridad operacional y se identifica claramente los requisitos aplicables en los manuales y procedimientos de la organización.',
        eficacia: 'S',
        valorEficacia: 1.22,
      },
      {
        item: 19,
        codigoComponente: 2,
        componente: 'Aseguramiento de la seguridad operacional (C3)',
        codigoElemento: 2.2,
        elemento: 'La gestión del cambio (E3.2).',
        indicadorCumplimiento:
          'La organización cuenta con un proceso para identificar si los cambios tienen un impacto en la seguridad operacional, así como para gestionar los riesgos identificados de acuerdo con los procesos de gestión de riesgos de seguridad operacional existentes.',
        eficacia: 'S',
        valorEficacia: 1.22,
      },
      {
        item: 20,
        codigoComponente: 2,
        componente: 'Aseguramiento de la seguridad operacional (C3)',
        codigoElemento: 2.2,
        elemento: 'La gestión del cambio (E3.2).',
        indicadorCumplimiento:
          'Las cuestiones relativas a los factores humanos (HF) se han considerado como parte del proceso de gestión del cambio y, donde corresponde, la organización ha aplicado las normas de diseño adecuadas, centradas en el factor humano, para el diseño de los equipos y el entorno físico.',
        eficacia: 'S',
        valorEficacia: 0.81,
      },
      {
        item: 21,
        codigoComponente: 2,
        componente: 'Aseguramiento de la seguridad operacional (C3)',
        codigoElemento: 2.3,
        elemento: 'Mejora continua del SMS (E3.3).',
        indicadorCumplimiento:
          'La organización supervisa y evalúa continuamente sus procesos de SMS para mantener o mejorar continuamente la eficacia total del SMS.',
        eficacia: 'O',
        valorEficacia: 1.38,
      },
      {
        item: 22,
        codigoComponente: 3,
        componente: 'Políticas y objetivos de la seguridad operacional (C1).',
        codigoElemento: 3.1,
        elemento: 'Compromiso de gestión (E 1.1)',
        indicadorCumplimiento:
          'Existe una política de seguridad operacional, firmada por el Gerente Responsable, que incluye un compromiso hacia la mejora continua; cumple con todos los requisitos y normas legales aplicables; y toma en consideración las mejores prácticas.',
        eficacia: 'S',
        valorEficacia: 0.41,
      },
      {
        item: 23,
        codigoComponente: 3,
        componente: 'Políticas y objetivos de la seguridad operacional (C1).',
        codigoElemento: 3.1,
        elemento: 'Compromiso de gestión (E 1.1)',
        indicadorCumplimiento:
          'La política de seguridad operacional incluye una declaración para proporcionar los recursos adecuados, y la organización está gestionándolos con el objetivo de anticipar y subsanar cualquier deficiencia.',
        eficacia: 'S',
        valorEficacia: 0.41,
      },
      {
        item: 41,
        codigoComponente: 4,
        componente: 'Promoción de la seguridad operacional (C4)',
        codigoElemento: 4.1,
        elemento: 'Instrucción y educación (E4.1)',
        indicadorCumplimiento:
          'Existe un programa de instrucción en SMS que incluye instrucción inicial y recurrente. La instrucción cubre las tareas de seguridad operacional individuales (incluyendo roles, responsabilidades y obligación de rendición de cuentas) y cómo funciona el SMS de la organización.',
        eficacia: 'O',
        valorEficacia: 2.76,
      },
      {
        item: 42,
        codigoComponente: 4,
        componente: 'Promoción de la seguridad operacional (C4)',
        codigoElemento: 4.1,
        elemento: 'Instrucción y educación (E4.1)',
        indicadorCumplimiento:
          'Hay un proceso en vigor para medir la eficacia de la instrucción y para adoptar las medidas adecuadas para mejorar la instrucción posterior.',
        eficacia: 'O',
        valorEficacia: 2.07,
      },
    ],
  };

  constructor(
    public dialogRef: MatDialogRef<GraficoSmsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { codigo: string }
  ) {}
  ngOnInit(): void {
    console.log('dddddd   :', this.data.codigo);
    /*this.dataSourceSms = this.dataPorAerodromoSms[this.data];
    console.log('datos: ', this.dataSourceSms);*/
  }
}
