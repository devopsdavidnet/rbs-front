import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from '../services/global.service';
import { ProveedoresServiceService } from '../services/proveedores-service.service';
import Proveedores from '../modelos/Proveedores';
import Orp from '../modelos/Orp';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AfterViewInit } from '@angular/core';
import { DetalleLvComponent } from '../detalle-lv/detalle-lv.component';
import { GraficoAerodromoComponent } from '../components/grafico-aerodromo/grafico-aerodromo.component';
import { DetalleNcrComponent } from '../detalle-ncr/detalle-ncr.component';
import { GraficoNcrComponent } from '../grafico-ncr/grafico-ncr.component';
import { DetalleNcrLvComponent } from '../detalle-ncr-lv/detalle-ncr-lv.component';

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

export interface FilaVerificacionSms {
  item: string;
  indicadorCumplimiento: string;
  eficacia: string;
}

interface Fila {
  nro: number;
  parametro: string;
  nivel3: string;
  nivel2: string;
  nivel1: string;
  resultadoNivel: number | null;
}

@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.css'],
})
export class PlanificacionComponent implements OnInit {
  niveles = [1, 2, 3, 'N/A'];
  nivel1Count = 0;
  nivel2Count = 0;
  nivel3Count = 0;
  nivelNA = 0;
  sumaResultadoPonderado: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSourceLv: FilaVerificacion[] = [];
  dataSourceSms: FilaVerificacionSms[] = [];
  dataSourceItems: FilaVerifcacionItem[] = [];

  listaVerificacion = [
    'lv',
    'listaVerificacion',
    'satisfactorio',
    'insatisfactorio',
    'noSatifConPacVigente',
    'noAplica',
    'noObservado',
    'totalPreguntas',
    'ncr',
    'detalle',
    'grafico',
  ];

  listaSms = [
    'item',
    'indicadorCumplimiento',
    'eficacia',
    'hallazgo',
    'comentarios',
    'observaciones',
  ];

  displayedColumns: string[] = [
    'nro',
    'parametro',
    'nivel3',
    'nivel2',
    'nivel1',
    'resultadoNivel',
  ];

  columnas: string[] = [
    'tipoOrganizacion',
    'organizacion',
    'fechaAsignacion',
    'estado',
    'acciones',
  ];
  /*
codigo: string;
  referencia: string;
  preguntaReglamento: string;
  constatacion: string;
  estadoCumplimiento: string;
  taxonomia: string;
  indiceRiesgo: string;
  categoria: string;
  accion: string;
*/
  // 🔹 Datos simulados (podrían venir del backend)
  dataPorItem: Record<string, FilaVerifcacionItem[]> = {
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
    SLVR: [
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
    SLGM: [
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

  // 🔹 Datos simulados (podrían venir del backend)
  dataPorAerodromo: Record<string, FilaVerificacion[]> = {
    SLLP: [
      {
        lv: 'LV-AGA-014',
        listaVerificacion: 'INSPECCIÓN A PROCESOS DE DATOS DE AERÓDROMO',
        satisfactorio: 5,
        noSatifConPacVigente: 5,
        insatisfactorio: 2,
        noAplica: 1,
        noObservado: 2,
        totalPreguntas: 10,
      },
      {
        lv: 'LV-AGA-015',
        listaVerificacion: 'INSPECCIÓN DE CARACTERÍSTICAS FÍSICAS DE AERÓDROMO',
        satisfactorio: 15,
        noSatifConPacVigente: 2,
        insatisfactorio: 10,
        noAplica: 1,
        noObservado: 2,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-016',
        listaVerificacion:
          'INSPECCIÓN AL ESTABLECIMIENTO DE RESTRICCIONES DE ALTURA',
        satisfactorio: 15,
        noSatifConPacVigente: 1,
        insatisfactorio: 10,
        noAplica: 1,
        noObservado: 2,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-017',
        listaVerificacion: 'INSPECCIÓN DE AYUDAS VISUALES DE AERÓDROMO',
        satisfactorio: 15,
        noSatifConPacVigente: 3,
        insatisfactorio: 10,
        noAplica: 1,
        noObservado: 2,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-018',
        listaVerificacion:
          'INSPECCIÓN DE AYUDAS VISUALES INDICADORAS DE OBSTÁCULO',
        satisfactorio: 15,
        noSatifConPacVigente: 2,
        insatisfactorio: 10,
        noAplica: 1,
        noObservado: 2,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-019',
        listaVerificacion: 'INSPECCIÓN DE SISTEMAS ELÉCTRICOS DE AERÓDROMO',
        satisfactorio: 15,
        noSatifConPacVigente: 1,
        insatisfactorio: 10,
        noAplica: 1,
        noObservado: 2,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-020',
        listaVerificacion: 'INSPECCION ADMINISTRATIVA ORGANIZACIONAL',
        satisfactorio: 15,
        noSatifConPacVigente: 2,
        insatisfactorio: 10,
        noAplica: 1,
        noObservado: 2,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-021',
        listaVerificacion:
          'INSPECCION A PROCESOS DE NOTIFICACION DE CONDICIONES',
        satisfactorio: 15,
        noSatifConPacVigente: 1,
        insatisfactorio: 10,
        noAplica: 1,
        noObservado: 2,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-022',
        listaVerificacion:
          'INSPECCIÓN A PROCESOS DE CONTROL DE OBSTÁCULOS Y PROT',
        satisfactorio: 15,
        noSatifConPacVigente: 2,
        insatisfactorio: 10,
        noAplica: 1,
        noObservado: 2,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-023',
        listaVerificacion:
          'INSPECCIÓN A PROCESOS DE SEÑALIZACIÓN DE AREAS DE USO R',
        satisfactorio: 15,
        noSatifConPacVigente: 3,
        insatisfactorio: 10,
        noAplica: 1,
        noObservado: 2,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-024',
        listaVerificacion: 'INSPECCIÓN A PROCESOS DE RESPUESTA A EMERGENCIAS',
        satisfactorio: 15,
        noSatifConPacVigente: 0,
        insatisfactorio: 10,
        noAplica: 1,
        noObservado: 2,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-025',
        listaVerificacion:
          'INSPECCIÓN DE SERVICIO DE SALVAMENTO Y EXTINCIÓN DE INCE',
        satisfactorio: 15,
        noSatifConPacVigente: 0,
        insatisfactorio: 10,
        noAplica: 1,
        noObservado: 2,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-026',
        listaVerificacion:
          'INSPECCIÓN A PROCESOS DE GESTIÓN DEL PELIGRO POR FAUNA',
        satisfactorio: 15,
        noSatifConPacVigente: 0,
        insatisfactorio: 10,
        noAplica: 1,
        noObservado: 2,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-027',
        listaVerificacion:
          'INSPECCIÓN A PROCESOS DE GESTIÓN DE OPERACIONES EN EL',
        satisfactorio: 15,
        noSatifConPacVigente: 0,
        insatisfactorio: 10,
        noAplica: 1,
        noObservado: 2,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-028',
        listaVerificacion:
          'INSPECCIÓN DE INSTALACIONES AUXILIARES DE AERÓDROMO',
        satisfactorio: 15,
        noSatifConPacVigente: 0,
        insatisfactorio: 10,
        noAplica: 1,
        noObservado: 2,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-029',
        listaVerificacion:
          'INSPECCIÓN A PROCESOS DE MANTENIMIENTO DE ÁREA DE MOVI',
        satisfactorio: 15,
        noSatifConPacVigente: 0,
        insatisfactorio: 10,
        noAplica: 1,
        noObservado: 2,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-030',
        listaVerificacion:
          'INSPECCIÓN A PROCESOS DE MANTENIMIENTO DE AYUDAS VISUA',
        satisfactorio: 15,
        noSatifConPacVigente: 0,
        insatisfactorio: 10,
        noAplica: 1,
        noObservado: 2,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-031',
        listaVerificacion:
          'INSPECCIÓN AL SISTEMA DE GESTIÓN DE SEGURIDAD OPERACIO',
        satisfactorio: 15,
        noSatifConPacVigente: 0,
        insatisfactorio: 10,
        noAplica: 1,
        noObservado: 2,
        totalPreguntas: 28,
      },
    ],
    SLVR: [
      {
        lv: 'LV-AGA-014',
        listaVerificacion: 'INSPECCIÓN A PROCESOS DE DATOS DE AERÓDROMO',
        satisfactorio: 2,
        noSatifConPacVigente: 0,
        insatisfactorio: 1,
        noAplica: 2,
        noObservado: 5,
        totalPreguntas: 10,
      },
      {
        lv: 'LV-AGA-015',
        listaVerificacion: 'INSPECCIÓN DE CARACTERÍSTICAS FÍSICAS DE AERÓDROMO',
        satisfactorio: 2,
        noSatifConPacVigente: 0,
        insatisfactorio: 1,
        noAplica: 10,
        noObservado: 15,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-016',
        listaVerificacion:
          'INSPECCIÓN AL ESTABLECIMIENTO DE RESTRICCIONES DE ALTURA',
        satisfactorio: 1,
        noSatifConPacVigente: 0,
        insatisfactorio: 2,
        noAplica: 10,
        noObservado: 15,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-017',
        listaVerificacion: 'INSPECCIÓN DE AYUDAS VISUALES DE AERÓDROMO',
        satisfactorio: 3,
        noSatifConPacVigente: 0,
        insatisfactorio: 14,
        noAplica: 10,
        noObservado: 1,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-018',
        listaVerificacion:
          'INSPECCIÓN DE AYUDAS VISUALES INDICADORAS DE OBSTÁCULO',
        satisfactorio: 4,
        noSatifConPacVigente: 0,
        insatisfactorio: 14,
        noAplica: 2,
        noObservado: 8,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-019',
        listaVerificacion: 'INSPECCIÓN DE SISTEMAS ELÉCTRICOS DE AERÓDROMO',
        satisfactorio: 8,
        noSatifConPacVigente: 1,
        insatisfactorio: 5,
        noAplica: 3,
        noObservado: 12,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-020',
        listaVerificacion: 'INSPECCION ADMINISTRATIVA ORGANIZACIONAL',
        satisfactorio: 8,
        noSatifConPacVigente: 1,
        insatisfactorio: 5,
        noAplica: 5,
        noObservado: 10,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-021',
        listaVerificacion:
          'INSPECCION A PROCESOS DE NOTIFICACION DE CONDICIONES',
        satisfactorio: 8,
        noSatifConPacVigente: 2,
        insatisfactorio: 2,
        noAplica: 10,
        noObservado: 8,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-022',
        listaVerificacion:
          'INSPECCIÓN A PROCESOS DE CONTROL DE OBSTÁCULOS Y PROT',
        satisfactorio: 10,
        noSatifConPacVigente: 0,
        insatisfactorio: 8,
        noAplica: 2,
        noObservado: 8,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-023',
        listaVerificacion:
          'INSPECCIÓN A PROCESOS DE SEÑALIZACIÓN DE AREAS DE USO R',
        satisfactorio: 8,
        noSatifConPacVigente: 1,
        insatisfactorio: 10,
        noAplica: 1,
        noObservado: 9,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-024',
        listaVerificacion: 'INSPECCIÓN A PROCESOS DE RESPUESTA A EMERGENCIAS',
        satisfactorio: 10,
        noSatifConPacVigente: 1,
        insatisfactorio: 3,
        noAplica: 5,
        noObservado: 10,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-025',
        listaVerificacion:
          'INSPECCIÓN DE SERVICIO DE SALVAMENTO Y EXTINCIÓN DE INCE',
        satisfactorio: 4,
        noSatifConPacVigente: 0,
        insatisfactorio: 4,
        noAplica: 10,
        noObservado: 10,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-026',
        listaVerificacion:
          'INSPECCIÓN A PROCESOS DE GESTIÓN DEL PELIGRO POR FAUNA',
        satisfactorio: 10,
        noSatifConPacVigente: 0,
        insatisfactorio: 8,
        noAplica: 2,
        noObservado: 8,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-027',
        listaVerificacion:
          'INSPECCIÓN A PROCESOS DE GESTIÓN DE OPERACIONES EN EL',
        satisfactorio: 9,
        noSatifConPacVigente: 1,
        insatisfactorio: 9,
        noAplica: 8,
        noObservado: 2,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-028',
        listaVerificacion:
          'INSPECCIÓN DE INSTALACIONES AUXILIARES DE AERÓDROMO',
        satisfactorio: 5,
        noSatifConPacVigente: 2,
        insatisfactorio: 5,
        noAplica: 10,
        noObservado: 8,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-029',
        listaVerificacion:
          'INSPECCIÓN A PROCESOS DE MANTENIMIENTO DE ÁREA DE MOVI',
        satisfactorio: 10,
        noSatifConPacVigente: 10,
        insatisfactorio: 10,
        noAplica: 4,
        noObservado: 4,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-030',
        listaVerificacion:
          'INSPECCIÓN A PROCESOS DE MANTENIMIENTO DE AYUDAS VISUA',
        satisfactorio: 9,
        noSatifConPacVigente: 0,
        insatisfactorio: 1,
        noAplica: 10,
        noObservado: 8,
        totalPreguntas: 28,
      },
      {
        lv: 'LV-AGA-031',
        listaVerificacion:
          'INSPECCIÓN AL SISTEMA DE GESTIÓN DE SEGURIDAD OPERACIO',
        satisfactorio: 14,
        noSatifConPacVigente: 0,
        insatisfactorio: 4,
        noAplica: 1,
        noObservado: 9,
        totalPreguntas: 28,
      },
    ],
    SLGM: [
      {
        lv: 'LV-AGA-037',
        listaVerificacion:
          'INSPECCION A CARACTERISTICAS FISICAS NO CERTIFICADO',
        satisfactorio: 27,
        noSatifConPacVigente: 0,
        insatisfactorio: 0,
        noAplica: 0,
        noObservado: 2,
        totalPreguntas: 27,
      },
      {
        lv: 'LV-AGA-038',
        listaVerificacion:
          'VIGILANCIA DE CONDICIONES OPERACIONALES DE AERÓDROMO',
        satisfactorio: 22,
        noSatifConPacVigente: 1,
        insatisfactorio: 6,
        noAplica: 2,
        noObservado: 2,
        totalPreguntas: 30,
      },
    ],
  };
  /*  hasta aqui las lv*/
  /*  preguntas sms  */

  // 🔹 Datos simulados (podrían venir del backend)

  dataPorAerodromoSms: Record<string, FilaVerificacionSms[]> = {
    SLLP: [
      {
        item: '1',
        indicadorCumplimiento:
          'Existe un sistema de notificación confidencial, que captura los errores, peligros y cuasicolisiones, que es fácil de usar y accesible a todo el personal.',
        eficacia: 'S',
      },
      {
        item: '2',
        indicadorCumplimiento:
          'El sistema de notificación confidencial brinda retroalimentación a la persona que notifica sobre las medidas adoptadas (o no adoptadas) y, cuando sea adecuado, al resto de la organización.',
        eficacia: 'E',
      },
      {
        item: '3',
        indicadorCumplimiento:
          'El personal expresa su confianza en la política y en los procesos de notificación de la organización.',
        eficacia: 'E',
      },
      {
        item: '4',
        indicadorCumplimiento:
          'Existe un proceso que define cómo se identifica peligros de múltiples fuentes utilizando métodos reactivos y proactivos (internos y externos).',
        eficacia: 'E',
      },
      {
        item: '5',
        indicadorCumplimiento:
          'El proceso de identificación de peligros identifica los peligros relacionados con la actuación humana.',
        eficacia: 'E',
      },
      {
        item: '6',
        indicadorCumplimiento:
          'Existe un proceso para analizar los datos y la información sobre seguridad operacional para buscar tendencias y obtener información de gestión utilizable.',
        eficacia: 'O',
      },
      {
        item: '7',
        indicadorCumplimiento:
          'Las investigaciones sobre seguridad operacional son realizadas por personal debidamente capacitado para identificar las causas de fondo (no sólo lo que sucedió, sino por qué sucedió).',
        eficacia: 'E',
      },
      {
        item: '8',
        indicadorCumplimiento:
          'Existe un proceso para la gestión de riesgos que incluye el análisis y evaluación de los riesgos asociados con los peligros identificados, expresado en términos de probabilidad y gravedad (o alguna metodología alternativa).',
        eficacia: 'O',
      },
      {
        item: '9',
        indicadorCumplimiento:
          'Hay criterios para evaluar el nivel de riesgo que la organización está dispuesta a aceptar, y las evaluaciones y clasificaciones de riesgos están debidamente justificadas.',
        eficacia: 'O',
      },
      {
        item: '10',
        indicadorCumplimiento:
          'La organización cuenta con un proceso para tomar decisiones y aplicar controles de riesgo adecuados y eficaces.',
        eficacia: 'O',
      },
      {
        item: '11',
        indicadorCumplimiento:
          'La alta gerencia tiene visibilidad de los peligros cuyo riesgo asociado es alto o medio, así como de su mitigación y control.',
        eficacia: 'O',
      },
      {
        item: '12',
        indicadorCumplimiento:
          'Los indicadores de rendimiento en materia de seguridad operacional (SPI) relacionados con los objetivos de seguridad operacional de la organización han sido definidos, promulgados y son observados y analizados para buscar tendencias.',
        eficacia: 'P',
      },
      {
        item: '13',
        indicadorCumplimiento:
          'Los controles y mitigaciones de los riesgos se verifican/auditan para confirmar que están funcionando y son eficaces.',
        eficacia: 'O',
      },
      {
        item: '14',
        indicadorCumplimiento:
          'El aseguramiento de la seguridad operacional toma en cuenta las actividades llevadas a cabo por todas las organizaciones directamente contratadas.',
        eficacia: 'S',
      },
      {
        item: '15',
        indicadorCumplimiento:
          'Se define las responsabilidades y la obligación de rendición de cuentas para garantizar el cumplimiento de las normas de la seguridad operacional y se identifica claramente los requisitos aplicables en los manuales y procedimientos de la organización.',
        eficacia: 'S',
      },
      {
        item: '16',
        indicadorCumplimiento:
          'Existe un programa de auditoría interna que incluye detalles sobre el calendario de auditorías, los procedimientos para las auditorías, la notificación, el seguimiento y los registros.',
        eficacia: 'S',
      },
      {
        item: '17',
        indicadorCumplimiento:
          'Se define las responsabilidades del proceso de auditoría interna y existe una persona o grupo de personas con responsabilidades de auditoría interna con acceso directo al ejecutivo/ gerente responsable.',
        eficacia: 'O',
      },
      {
        item: '18',
        indicadorCumplimiento:
          'Después de una auditoría, se realiza un análisis apropiado de los factores causales y se toman medidas correctivas/ preventivas.',
        eficacia: 'O',
      },
      {
        item: '19',
        indicadorCumplimiento:
          'La organización cuenta con un proceso para identificar si los cambios tienen un impacto en la seguridad operacional, así como para gestionar los riesgos identificados de acuerdo con los procesos de gestión de riesgos de seguridad operacional existentes.',
        eficacia: 'O',
      },
      {
        item: '20',
        indicadorCumplimiento:
          'Las cuestiones relativas a los factores humanos (HF) se han considerado como parte del proceso de gestión del cambio y, donde corresponde, la organización ha aplicado las normas de diseño adecuadas, centradas en el factor humano, para el diseño de los equipos y el entorno físico.',
        eficacia: 'O',
      },
      {
        item: '21',
        indicadorCumplimiento:
          'La organización supervisa y evalúa continuamente sus procesos de SMS para mantener o mejorar continuamente la eficacia total del SMS.',
        eficacia: 'O',
      },
      {
        item: '22',
        indicadorCumplimiento:
          'Existe una política de seguridad operacional, firmada por el Gerente Responsable, que incluye un compromiso hacia la mejora continua; cumple con todos los requisitos y normas legales aplicables; y toma en consideración las mejores prácticas.',
        eficacia: 'O',
      },
      {
        item: '23',
        indicadorCumplimiento:
          'La política de seguridad operacional incluye una declaración para proporcionar los recursos adecuados, y la organización está gestionándolos con el objetivo de anticipar y subsanar cualquier deficiencia.',
        eficacia: 'O',
      },
      {
        item: '24',
        indicadorCumplimiento:
          'Existen políticas establecidas para las funciones críticas de seguridad operacional, relacionadas con todos los aspectos de aptitud para el trabajo (por ejemplo, la política sobre alcohol y drogas o la fatiga).',
        eficacia: 'O',
      },
      {
        item: '25',
        indicadorCumplimiento:
          'Existe un medio para la comunicación de la política de seguridad operacional.',
        eficacia: 'O',
      },
      {
        item: '26',
        indicadorCumplimiento:
          'El ejecutivo responsable y el equipo de la alta gerencia promueven una cultura positiva de seguridad operacional/justicia y demuestran su compromiso con la política de seguridad operacional, a través de la participación activa y visible en el sistema de gestión de la seguridad operacional.',
        eficacia: 'O',
      },
      {
        item: '27',
        indicadorCumplimiento:
          'La política sobre seguridad operacional fomenta activamente las notificaciones sobre seguridad operacional.',
        eficacia: 'O',
      },
      {
        item: '28',
        indicadorCumplimiento:
          'Se ha definido una política y principios de una cultura justa que identifican claramente los comportamientos aceptables e inaceptables para promover una cultura justa.',
        eficacia: 'O',
      },
      {
        item: '29',
        indicadorCumplimiento:
          'Se han establecido objetivos de seguridad operacional coherentes con la política de seguridad operacional y éstos son comunicados a toda la organización.',
        eficacia: 'O',
      },
      {
        item: '30',
        indicadorCumplimiento:
          'El programa estatal de seguridad operacional (SSP) está siendo considerado y abordado según corresponda.',
        eficacia: 'O',
      },
      {
        item: '31',
        indicadorCumplimiento:
          'Se ha nombrado un ejecutivo responsable con plena responsabilidad y obligación de rendición de cuentas para garantizar que el SMS se aplique correctamente y funcione con eficacia.',
        eficacia: 'E',
      },
      {
        item: '32',
        indicadorCumplimiento:
          'El ejecutivo/ gerente responsable es plenamente consciente de sus funciones y responsabilidades en materia del SMS con respecto a la política de seguridad operacional, los requisitos de seguridad operacional y la cultura de seguridad operacional de la organización.',
        eficacia: 'E',
      },
      {
        item: '33',
        indicadorCumplimiento:
          'Las obligaciones de rendición de cuentas, las autoridades y las responsabilidades están definidas y documentadas en toda la organización y el personal comprende sus propias responsabilidades.',
        eficacia: 'E',
      },
    ],
    SLVR: [
      {
        item: '1',
        indicadorCumplimiento:
          'Existe un sistema de notificación confidencial, que captura los errores, peligros y cuasicolisiones, que es fácil de usar y accesible a todo el personal.',
        eficacia: 'O',
      },
      {
        item: '2',
        indicadorCumplimiento:
          'El sistema de notificación confidencial brinda retroalimentación a la persona que notifica sobre las medidas adoptadas (o no adoptadas) y, cuando sea adecuado, al resto de la organización.',
        eficacia: 'O',
      },
      {
        item: '3',
        indicadorCumplimiento:
          'El personal expresa su confianza en la política y en los procesos de notificación de la organización.',
        eficacia: 'E',
      },
      {
        item: '4',
        indicadorCumplimiento:
          'Existe un proceso que define cómo se identifica peligros de múltiples fuentes utilizando métodos reactivos y proactivos (internos y externos).',
        eficacia: 'E',
      },
      {
        item: '5',
        indicadorCumplimiento:
          'El proceso de identificación de peligros identifica los peligros relacionados con la actuación humana.',
        eficacia: 'O',
      },
      {
        item: '6',
        indicadorCumplimiento:
          'Existe un proceso para analizar los datos y la información sobre seguridad operacional para buscar tendencias y obtener información de gestión utilizable.',
        eficacia: 'O',
      },
      {
        item: '7',
        indicadorCumplimiento:
          'Las investigaciones sobre seguridad operacional son realizadas por personal debidamente capacitado para identificar las causas de fondo (no sólo lo que sucedió, sino por qué sucedió).',
        eficacia: 'E',
      },
      {
        item: '8',
        indicadorCumplimiento:
          'Existe un proceso para la gestión de riesgos que incluye el análisis y evaluación de los riesgos asociados con los peligros identificados, expresado en términos de probabilidad y gravedad (o alguna metodología alternativa).',
        eficacia: 'O',
      },
      {
        item: '9',
        indicadorCumplimiento:
          'Hay criterios para evaluar el nivel de riesgo que la organización está dispuesta a aceptar, y las evaluaciones y clasificaciones de riesgos están debidamente justificadas.',
        eficacia: 'O',
      },
      {
        item: '10',
        indicadorCumplimiento:
          'La organización cuenta con un proceso para tomar decisiones y aplicar controles de riesgo adecuados y eficaces.',
        eficacia: 'O',
      },
      {
        item: '11',
        indicadorCumplimiento:
          'La alta gerencia tiene visibilidad de los peligros cuyo riesgo asociado es alto o medio, así como de su mitigación y control.',
        eficacia: 'O',
      },
      {
        item: '12',
        indicadorCumplimiento:
          'Los indicadores de rendimiento en materia de seguridad operacional (SPI) relacionados con los objetivos de seguridad operacional de la organización han sido definidos, promulgados y son observados y analizados para buscar tendencias.',
        eficacia: 'S',
      },
      {
        item: '13',
        indicadorCumplimiento:
          'Los controles y mitigaciones de los riesgos se verifican/auditan para confirmar que están funcionando y son eficaces.',
        eficacia: 'S',
      },
      {
        item: '14',
        indicadorCumplimiento:
          'El aseguramiento de la seguridad operacional toma en cuenta las actividades llevadas a cabo por todas las organizaciones directamente contratadas.',
        eficacia: 'S',
      },
      {
        item: '15',
        indicadorCumplimiento:
          'Se define las responsabilidades y la obligación de rendición de cuentas para garantizar el cumplimiento de las normas de la seguridad operacional y se identifica claramente los requisitos aplicables en los manuales y procedimientos de la organización.',
        eficacia: 'S',
      },
      {
        item: '16',
        indicadorCumplimiento:
          'Existe un programa de auditoría interna que incluye detalles sobre el calendario de auditorías, los procedimientos para las auditorías, la notificación, el seguimiento y los registros.',
        eficacia: 'S',
      },
      {
        item: '17',
        indicadorCumplimiento:
          'Se define las responsabilidades del proceso de auditoría interna y existe una persona o grupo de personas con responsabilidades de auditoría interna con acceso directo al ejecutivo/ gerente responsable.',
        eficacia: 'S',
      },
      {
        item: '18',
        indicadorCumplimiento:
          'Después de una auditoría, se realiza un análisis apropiado de los factores causales y se toman medidas correctivas/ preventivas.',
        eficacia: 'S',
      },
      {
        item: '19',
        indicadorCumplimiento:
          'La organización cuenta con un proceso para identificar si los cambios tienen un impacto en la seguridad operacional, así como para gestionar los riesgos identificados de acuerdo con los procesos de gestión de riesgos de seguridad operacional existentes.',
        eficacia: 'S',
      },
      {
        item: '20',
        indicadorCumplimiento:
          'Las cuestiones relativas a los factores humanos (HF) se han considerado como parte del proceso de gestión del cambio y, donde corresponde, la organización ha aplicado las normas de diseño adecuadas, centradas en el factor humano, para el diseño de los equipos y el entorno físico.',
        eficacia: 'S',
      },
      {
        item: '21',
        indicadorCumplimiento:
          'La organización supervisa y evalúa continuamente sus procesos de SMS para mantener o mejorar continuamente la eficacia total del SMS.',
        eficacia: 'S',
      },
      {
        item: '22',
        indicadorCumplimiento:
          'Existe una política de seguridad operacional, firmada por el Gerente Responsable, que incluye un compromiso hacia la mejora continua; cumple con todos los requisitos y normas legales aplicables; y toma en consideración las mejores prácticas.',
        eficacia: 'S',
      },
      {
        item: '23',
        indicadorCumplimiento:
          'La política de seguridad operacional incluye una declaración para proporcionar los recursos adecuados, y la organización está gestionándolos con el objetivo de anticipar y subsanar cualquier deficiencia.',
        eficacia: 'S',
      },
      {
        item: '24',
        indicadorCumplimiento:
          'Existen políticas establecidas para las funciones críticas de seguridad operacional, relacionadas con todos los aspectos de aptitud para el trabajo (por ejemplo, la política sobre alcohol y drogas o la fatiga).',
        eficacia: 'S',
      },
      {
        item: '25',
        indicadorCumplimiento:
          'Existe un medio para la comunicación de la política de seguridad operacional.',
        eficacia: 'S',
      },
      {
        item: '26',
        indicadorCumplimiento:
          'El ejecutivo responsable y el equipo de la alta gerencia promueven una cultura positiva de seguridad operacional/justicia y demuestran su compromiso con la política de seguridad operacional, a través de la participación activa y visible en el sistema de gestión de la seguridad operacional.',
        eficacia: 'S',
      },
      {
        item: '27',
        indicadorCumplimiento:
          'La política sobre seguridad operacional fomenta activamente las notificaciones sobre seguridad operacional.',
        eficacia: 'S',
      },
      {
        item: '28',
        indicadorCumplimiento:
          'Se ha definido una política y principios de una cultura justa que identifican claramente los comportamientos aceptables e inaceptables para promover una cultura justa.',
        eficacia: 'P',
      },
      {
        item: '29',
        indicadorCumplimiento:
          'Se han establecido objetivos de seguridad operacional coherentes con la política de seguridad operacional y éstos son comunicados a toda la organización.',
        eficacia: 'P',
      },
      {
        item: '30',
        indicadorCumplimiento:
          'El programa estatal de seguridad operacional (SSP) está siendo considerado y abordado según corresponda.',
        eficacia: 'O',
      },
      {
        item: '31',
        indicadorCumplimiento:
          'Se ha nombrado un ejecutivo responsable con plena responsabilidad y obligación de rendición de cuentas para garantizar que el SMS se aplique correctamente y funcione con eficacia.',
        eficacia: 'E',
      },
      {
        item: '32',
        indicadorCumplimiento:
          'El ejecutivo/ gerente responsable es plenamente consciente de sus funciones y responsabilidades en materia del SMS con respecto a la política de seguridad operacional, los requisitos de seguridad operacional y la cultura de seguridad operacional de la organización.',
        eficacia: 'E',
      },
      {
        item: '33',
        indicadorCumplimiento:
          'Las obligaciones de rendición de cuentas, las autoridades y las responsabilidades están definidas y documentadas en toda la organización y el personal comprende sus propias responsabilidades.',
        eficacia: 'E',
      },
    ],
    SLGM: [
      {
        item: '1',
        indicadorCumplimiento:
          'Existe un sistema de notificación confidencial, que captura los errores, peligros y cuasicolisiones, que es fácil de usar y accesible a todo el personal.',
        eficacia: 'P',
      },
      {
        item: '2',
        indicadorCumplimiento:
          'El sistema de notificación confidencial brinda retroalimentación a la persona que notifica sobre las medidas adoptadas (o no adoptadas) y, cuando sea adecuado, al resto de la organización.',
        eficacia: 'P',
      },
      {
        item: '3',
        indicadorCumplimiento:
          'El personal expresa su confianza en la política y en los procesos de notificación de la organización.',
        eficacia: 'P',
      },
      {
        item: '4',
        indicadorCumplimiento:
          'Existe un proceso que define cómo se identifica peligros de múltiples fuentes utilizando métodos reactivos y proactivos (internos y externos).',
        eficacia: 'E',
      },
      {
        item: '5',
        indicadorCumplimiento:
          'El proceso de identificación de peligros identifica los peligros relacionados con la actuación humana.',
        eficacia: 'P',
      },
      {
        item: '6',
        indicadorCumplimiento:
          'Existe un proceso para analizar los datos y la información sobre seguridad operacional para buscar tendencias y obtener información de gestión utilizable.',
        eficacia: 'P',
      },
      {
        item: '7',
        indicadorCumplimiento:
          'Las investigaciones sobre seguridad operacional son realizadas por personal debidamente capacitado para identificar las causas de fondo (no sólo lo que sucedió, sino por qué sucedió).',
        eficacia: 'P',
      },
      {
        item: '8',
        indicadorCumplimiento:
          'Existe un proceso para la gestión de riesgos que incluye el análisis y evaluación de los riesgos asociados con los peligros identificados, expresado en términos de probabilidad y gravedad (o alguna metodología alternativa).',
        eficacia: 'P',
      },
      {
        item: '9',
        indicadorCumplimiento:
          'Hay criterios para evaluar el nivel de riesgo que la organización está dispuesta a aceptar, y las evaluaciones y clasificaciones de riesgos están debidamente justificadas.',
        eficacia: 'P',
      },
      {
        item: '10',
        indicadorCumplimiento:
          'La organización cuenta con un proceso para tomar decisiones y aplicar controles de riesgo adecuados y eficaces.',
        eficacia: 'P',
      },
      {
        item: '11',
        indicadorCumplimiento:
          'La alta gerencia tiene visibilidad de los peligros cuyo riesgo asociado es alto o medio, así como de su mitigación y control.',
        eficacia: 'P',
      },
      {
        item: '12',
        indicadorCumplimiento:
          'Los indicadores de rendimiento en materia de seguridad operacional (SPI) relacionados con los objetivos de seguridad operacional de la organización han sido definidos, promulgados y son observados y analizados para buscar tendencias.',
        eficacia: 'P',
      },
      {
        item: '13',
        indicadorCumplimiento:
          'Los controles y mitigaciones de los riesgos se verifican/auditan para confirmar que están funcionando y son eficaces.',
        eficacia: 'P',
      },
      {
        item: '14',
        indicadorCumplimiento:
          'El aseguramiento de la seguridad operacional toma en cuenta las actividades llevadas a cabo por todas las organizaciones directamente contratadas.',
        eficacia: 'P',
      },
      {
        item: '15',
        indicadorCumplimiento:
          'Se define las responsabilidades y la obligación de rendición de cuentas para garantizar el cumplimiento de las normas de la seguridad operacional y se identifica claramente los requisitos aplicables en los manuales y procedimientos de la organización.',
        eficacia: 'P',
      },
      {
        item: '16',
        indicadorCumplimiento:
          'Existe un programa de auditoría interna que incluye detalles sobre el calendario de auditorías, los procedimientos para las auditorías, la notificación, el seguimiento y los registros.',
        eficacia: 'P',
      },
      {
        item: '17',
        indicadorCumplimiento:
          'Se define las responsabilidades del proceso de auditoría interna y existe una persona o grupo de personas con responsabilidades de auditoría interna con acceso directo al ejecutivo/ gerente responsable.',
        eficacia: 'S',
      },
      {
        item: '18',
        indicadorCumplimiento:
          'Después de una auditoría, se realiza un análisis apropiado de los factores causales y se toman medidas correctivas/ preventivas.',
        eficacia: 'S',
      },
      {
        item: '19',
        indicadorCumplimiento:
          'La organización cuenta con un proceso para identificar si los cambios tienen un impacto en la seguridad operacional, así como para gestionar los riesgos identificados de acuerdo con los procesos de gestión de riesgos de seguridad operacional existentes.',
        eficacia: 'S',
      },
      {
        item: '20',
        indicadorCumplimiento:
          'Las cuestiones relativas a los factores humanos (HF) se han considerado como parte del proceso de gestión del cambio y, donde corresponde, la organización ha aplicado las normas de diseño adecuadas, centradas en el factor humano, para el diseño de los equipos y el entorno físico.',
        eficacia: 'S',
      },
      {
        item: '21',
        indicadorCumplimiento:
          'La organización supervisa y evalúa continuamente sus procesos de SMS para mantener o mejorar continuamente la eficacia total del SMS.',
        eficacia: 'S',
      },
      {
        item: '22',
        indicadorCumplimiento:
          'Existe una política de seguridad operacional, firmada por el Gerente Responsable, que incluye un compromiso hacia la mejora continua; cumple con todos los requisitos y normas legales aplicables; y toma en consideración las mejores prácticas.',
        eficacia: 'S',
      },
      {
        item: '23',
        indicadorCumplimiento:
          'La política de seguridad operacional incluye una declaración para proporcionar los recursos adecuados, y la organización está gestionándolos con el objetivo de anticipar y subsanar cualquier deficiencia.',
        eficacia: 'S',
      },
      {
        item: '24',
        indicadorCumplimiento:
          'Existen políticas establecidas para las funciones críticas de seguridad operacional, relacionadas con todos los aspectos de aptitud para el trabajo (por ejemplo, la política sobre alcohol y drogas o la fatiga).',
        eficacia: 'S',
      },
      {
        item: '25',
        indicadorCumplimiento:
          'Existe un medio para la comunicación de la política de seguridad operacional.',
        eficacia: 'S',
      },
      {
        item: '26',
        indicadorCumplimiento:
          'El ejecutivo responsable y el equipo de la alta gerencia promueven una cultura positiva de seguridad operacional/justicia y demuestran su compromiso con la política de seguridad operacional, a través de la participación activa y visible en el sistema de gestión de la seguridad operacional.',
        eficacia: 'S',
      },
      {
        item: '27',
        indicadorCumplimiento:
          'La política sobre seguridad operacional fomenta activamente las notificaciones sobre seguridad operacional.',
        eficacia: 'S',
      },
      {
        item: '28',
        indicadorCumplimiento:
          'Se ha definido una política y principios de una cultura justa que identifican claramente los comportamientos aceptables e inaceptables para promover una cultura justa.',
        eficacia: 'S',
      },
      {
        item: '29',
        indicadorCumplimiento:
          'Se han establecido objetivos de seguridad operacional coherentes con la política de seguridad operacional y éstos son comunicados a toda la organización.',
        eficacia: 'E',
      },
      {
        item: '30',
        indicadorCumplimiento:
          'El programa estatal de seguridad operacional (SSP) está siendo considerado y abordado según corresponda.',
        eficacia: 'O',
      },
      {
        item: '31',
        indicadorCumplimiento:
          'Se ha nombrado un ejecutivo responsable con plena responsabilidad y obligación de rendición de cuentas para garantizar que el SMS se aplique correctamente y funcione con eficacia.',
        eficacia: 'O',
      },
      {
        item: '32',
        indicadorCumplimiento:
          'El ejecutivo/ gerente responsable es plenamente consciente de sus funciones y responsabilidades en materia del SMS con respecto a la política de seguridad operacional, los requisitos de seguridad operacional y la cultura de seguridad operacional de la organización.',
        eficacia: 'E',
      },
      {
        item: '33',
        indicadorCumplimiento:
          'Las obligaciones de rendición de cuentas, las autoridades y las responsabilidades están definidas y documentadas en toda la organización y el personal comprende sus propias responsabilidades.',
        eficacia: 'E',
      },
    ],
  };

  /*aerodromos= Object.keys(this.dataPorAerodromo);
  aerodromoSeleccionado='SLLP';*/

  aerodromosFila = Object.keys(this.dataPorAerodromo);
  aerodromoSeleccionado = this.aerodromosFila[0];
  filas1: FilaVerificacion[] = [];

  datos: any[] = [];
  isMobile: boolean = true;
  proveedoresLista?: Proveedores[];
  oprLista?: Orp[];
  dataSource1 = new MatTableDataSource<Proveedores>();
  dataSource3 = new MatTableDataSource<any>();
  dataSource = new MatTableDataSource<any>();
  form!: FormGroup;

  formAerodromo!: FormGroup;

  aerodromos = [
    { codigo: 'SLLP', nombre: 'Aeropuerto Internacional El Alto' },
    { codigo: 'SLVR', nombre: 'Aeropuerto Internacional Viru Viru' },
    { codigo: 'SLTJ', nombre: 'Aeropuerto Capitán Oriel Lea Plaza' },
    { codigo: 'SLCB', nombre: 'Aeropuerto Jorge Wilstermann' },
    { codigo: 'SLAL', nombre: 'Aeropuerto Alcantari' },
    { codigo: 'SLTJ', nombre: 'Aeropuerto Capitán Oriel Lea Plaza' },
    { codigo: 'SLGM', nombre: 'Aeropuerto de Guayaramerin' },
  ];

  constructor(
    private fb: FormBuilder,
    private global: GlobalService,
    private dialog: MatDialog,
    private proveedorService: ProveedoresServiceService
  ) {
    this.global.isMobile$.subscribe((valor) => {
      this.isMobile = valor;
    });

    this.formIndicador1 = this.fb.group({
      filas: this.fb.array(
        this.criterios.map(() => this.fb.group({ valor: [null] }))
      ),
    });

    // Suscribirse a cambios del formulario
    this.filasFormArray1.valueChanges.subscribe(() => {
      this.actualizarTotalYCategoria();
    });

    this.formAerodromo = this.fb.group({
      aerodromo: [null],
    });
  }

  verDetalleNcr(): void {
    const dataTotales = {
      satisfactorio: this.getTotal('satisfactorio'),
      insatisfactorio: this.getTotal('insatisfactorio'),
      noSatisfConPacVigente: this.getTotal('noSatifConPacVigente'),
      noAplica: this.getTotal('noAplica'),
      noObservado: this.getTotal('noObservado'),
      totalPreguntas:
        this.getTotal('satisfactorio') +
        this.getTotal('insatisfactorio') +
        this.getTotal('noSatifConPacVigente') +
        this.getTotal('noAplica') +
        this.getTotal('noObservado'),
    };

    this.dialog.open(DetalleNcrComponent, {
      width: '700px',
      data: dataTotales,
    });
  }

  verDetalleNcrLv(row: any) {
    console.log('Detalle del registro:', row);

    const dialogRef = this.dialog.open(DetalleNcrLvComponent, {
      width: '35%',
      data: row,
      disableClose: true,

      position: {
        top: '320px',
      },
    });
  }

  verDetalleItem(row: any) {
    console.log('Detalle del registro:', row);
    //formAerodromo
    console.log('**DDDDDDDDDDDDDDD**', this.formAerodromo.value);

    /*const dialogRef = this.dialog.open(RegistroAeronavesComponent, {
      width: '1000px',
      disableClose: true,
      data: dataActual,
      position: {
        top: '100px',
      },
    });*/

    const dialogRef = this.dialog.open(DetalleLvComponent, {
      width: '1000px',
      data: row,
      disableClose: true,

      position: {
        top: '100px',
      },
    });

    // Aquí puedes abrir un dialog, mostrar más información, etc.
  }

  verGraficoNcr(): void {
    const dataTotales = {
      satisfactorio: this.getTotal('satisfactorio'),
      insatisfactorio: this.getTotal('insatisfactorio'),
      noSatifConPacVigente: this.getTotal('noSatifConPacVigente'),
      noAplica: this.getTotal('noAplica'),
      observado: this.getTotal('noObservado'),
      totalPreguntas: this.getTotal('totalPreguntas'),
    };

    this.dialog.open(GraficoNcrComponent, {
      width: '700px',
      data: dataTotales,
    });
  }

  /*verGrafico(row: any) {
    console.log('Mostrar gráfico para:', row);
    // Aquí puedes abrir un gráfico o redirigir a otro componente.
  }*/

  actualizarFilas() {
    this.filas1 = this.dataPorAerodromo[this.aerodromoSeleccionado] || [];
  }

  verGrafico(fila: FilaVerificacion) {
    this.dialog.open(GraficoAerodromoComponent, {
      width: '600px',
      data: fila,
    });
  }

  getTotal(campo: keyof (typeof this.dataSourceLv)[0]) {
    return this.dataSourceLv.reduce(
      (acc, row) => acc + Number(row[campo] || 0),
      0
    );
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      companyName: [''],
      location: [''],
      filas: this.fb.array([]),
    });

    this.proveedorService.getProveedores().subscribe((data) => {
      this.dataSource1 = data;
      console.log(this.dataSource1);
    });

    this.proveedorService.getParamOrp().subscribe((data) => {
      this.dataSource3.data = data;
      this.initFormArray(data);
    });

    //getIndicadorExposicion
    /*
  campos: string[] = 
   ['criterio', 
    'calificacion'
    
  ];
*/

    this.proveedorService.getIndicadorExposicion().subscribe((data) => {
      this.dataSource.data = data;
    });

    // Construye FormArray
    const formArray = this.formIndicador1.get('indicadores') as FormArray;
    this.dataSource.data.forEach(() => {
      formArray.push(this.fb.group({ valorResultado: [null] }));
    });

    this.proveedorService.getParamOrp().subscribe((data) => {
      this.datos = data;
      console.log(this.datos);
    });

    //tabien es necesario llamar a este cálculo cuadno cambien los
    //valores por ejemplo, en el ngOnInit o cuando se inicializa el formulario
    this.form.valueChanges.subscribe(() => {
      this.calcularSumaPonderada();
    });

    this.columnasVisibles = [
      'exposicionTexto',
      ...this.columnasRiesgo.map((c) => c.valor),
    ];
  }

  seleccionarAerodromo() {
    const codigo = this.formAerodromo.value.aerodromo;
    console.log('david apaza canaza');
    this.dataSourceLv = this.dataPorAerodromo[codigo] || [];
    this.dataSourceSms = this.dataPorAerodromoSms[codigo] || [];
    console.log('dataSourceLv :', this.dataSourceLv);
    console.log('dataSourceSms : ', this.dataSourceSms);
  }

  seleccionarAerodromoSms() {
    const codigoSms = this.formAerodromo.value.aerodromo;
    console.log('valor codigoSms', codigoSms);
    this.dataSourceSms = this.dataPorAerodromoSms[codigoSms] || [];
  }

  determinarCategoriaORP(): number | string {
    const puntaje = this.sumaResultadoPonderado;
    if (puntaje >= 100 && puntaje <= 140) {
      return 1; //más deseable
    } else if (puntaje > 140 && puntaje <= 180) {
      return 2;
    } else if (puntaje > 180 && puntaje <= 220) {
      return 3;
    } else if (puntaje > 220 && puntaje <= 260) {
      return 4;
    } else if (puntaje > 260 && puntaje <= 300) {
      return 5; // menos deseable
    } else {
      return '.....'; //Fuera de rango en caso de que el puntaje no esté en los rangos definidos
    }
  }

  ngAfterViewInit(): void {
    this.dataSource3.paginator = this.paginator;
  }

  getFormGroupById(id: number): FormGroup {
    const filas = this.form.get('filas') as FormArray;
    const index = this.dataSource3.data.findIndex((d) => d.id === id);
    return filas.at(index) as FormGroup;
  }

  initFormArray(datos: any[]): void {
    const filasArray = this.form.get('filas') as FormArray;
    filasArray.clear();

    datos.forEach((item) => {
      const filaGroup = this.fb.group({
        id: [item.id],
        parametroRiesgosOrganizacion: [item.parametroRiesgosOrganizacion],
        nivelTresMenosDeseableo: [item.nivelTresMenosDeseableo],
        nivelDosPromedio: [item.nivelDosPromedio],
        nivelUnoMasDeseable: [item.nivelUnoMasDeseable],
        resultadoNivel: [item.resultadoNivel ?? null],
      });

      // Escuchar cambios por fila
      filaGroup.get('resultadoNivel')?.valueChanges.subscribe(() => {
        this.contarNiveles(); // actualizar los conteos en tiempo real
      });

      filasArray.push(filaGroup);
    });

    this.contarNiveles(); // contar al iniciar
  }

  get filasFormArray(): FormArray {
    return this.form.get('filas') as FormArray;
  }

  get sumaResultadoNivel(): number {
    const filas = this.filasFormArray;
    return filas.controls.reduce((acc, ctrl) => {
      const val = Number(ctrl.get('resultadoNivel')?.value);

      return acc + (isNaN(val) ? 0 : val);
    }, 0);
  }

  nivelNACount: number = 0;

  calcularSumaPonderada() {
    this.sumaResultadoPonderado = 0;
    this.nivelNACount = 0;

    this.dataSource3.data.forEach((row) => {
      const formGroup = this.getFormGroupById(row.id);
      const resultadoNivel = formGroup?.get('resultadoNivel')?.value; // Encadenamiento opcional

      if (
        resultadoNivel === undefined ||
        resultadoNivel === null ||
        resultadoNivel === 'N/A' ||
        isNaN(resultadoNivel)
      ) {
        this.nivelNACount++;
        return;
      }

      const peso = row.peso;
      if (peso && typeof resultadoNivel === 'number') {
        this.sumaResultadoPonderado += resultadoNivel * peso;
      }
    });

    this.sumaResultadoPonderado = parseFloat(
      this.sumaResultadoPonderado.toFixed(2)
    );
    this.actualizarCategoriaSeleccionada(); // ✅ ACTUALIZAR AQUÍ
  }

  @ViewChild('tabGroup') tabGroup: any;
  selectedData: any = null; // Para almacenar los datos del elemento seleccionado

  editar(row: any) {
    //aqui camie de esto === a esto !==
    if (row.estado !== 'Activo') {
      this.selectedData = row; // opcional  si necesitas usar los datos en otras partes
      const tipoOrganizacion = row.tipoOrganizacion;
      const organizacion = row.organizacion;
      console.log('Tipo de Organización:', tipoOrganizacion);
      console.log('Organización:', organizacion);

      //  llenar un formulario o pasar los datos al segundo tab:
      this.form.get('companyName')?.setValue(organizacion);
      this.form.get('location')?.setValue(tipoOrganizacion);

      console.log('RRRRRRRRRRRRRRRRRRR' + this.isMobile);

      /*this.form.patchValue({
      companyName: row.companyName,
      location: row.location
    });*/
      this.tabGroup.selectedIndex = 1; // cambiar a la pestaña 2
    } else {
      console.log('El elemento no está en estado Activo.');
    }
  }

  eliminar(row: any) {
    console.log('Eliminar:', row);
    // lógica para eliminar
  }

  get filas(): FormArray {
    return this.form.get('filas') as FormArray;
  }

  guardar(): void {
    const valores = this.filas.value;
    console.log('📝 JSON Resultado:', JSON.stringify(valores, null, 2));
  }

  contarNiveles(): void {
    const filas = this.form.get('filas') as FormArray;
    this.nivel1Count = 0;
    this.nivel2Count = 0;
    this.nivel3Count = 0;
    this.nivelNA = 0;

    filas.controls.forEach((ctrl) => {
      const nivel = ctrl.get('resultadoNivel')?.value;
      if (nivel === 1) this.nivel1Count++;
      else if (nivel === 2) this.nivel2Count++;
      else if (nivel === 3) this.nivel3Count++;
      else if (nivel === 'N/A') this.nivelNA++;
    });
  }

  criterios = [
    { criterio: 'Criterio A', calificacion: 'Descripción A' },
    { criterio: 'Criterio B', calificacion: 'Descripción B' },
    { criterio: 'Criterio C', calificacion: 'Descripción C' },
    { criterio: 'Criterio C', calificacion: 'Descripción C' },
    { criterio: 'Criterio C', calificacion: 'Descripción C' },
  ];

  formIndicador1!: FormGroup;

  displayedColumns1: string[] = ['criterio', 'calificacion', 'valorResultado'];
  total: number = 0;
  //categoria: string = 'N/A';
  categoria: string = '.....';

  displayedColumns2: string[] = ['criterio', 'poblacion', 'resultado'];

  get filasFormArray1(): FormArray {
    return this.formIndicador1.get('filas') as FormArray;
  }

  getRowFormGroup(index: number): FormGroup {
    console.log('esto es una prueba de david apaza');
    return this.filasFormArray1.at(index) as FormGroup;
  }

  actualizarTotalYCategoria(): void {
    const valores = this.filasFormArray1.controls.map(
      (c) => c.get('valor')?.value || 0
    );
    this.total = valores.reduce((sum, v) => sum + v, 0);
    this.categoria = this.calcularCategoria(this.total);
    this.actualizarCategoriaSeleccionada(); // ✅ ACTUALIZAR AQUÍ
  }

  calcularCategoria(total: number): string {
    if (total >= 5 && total < 7) return 'A';
    if (total >= 7 && total < 9) return 'B';
    if (total >= 9 && total < 11) return 'C';
    if (total >= 11 && total < 13) return 'D';
    if (total >= 13 && total <= 15) return 'E';
    return 'N/A';
  }

  columnasVisibles: string[] = [];

  columnasRiesgo = [
    { valor: '5', texto: 'Muy Alto' },
    { valor: '4', texto: ' Alto   ' },
    { valor: '3', texto: 'Moderado' },
    { valor: '2', texto: 'Bajo' },
    { valor: '1', texto: 'Muy bajo' },
  ];

  nivelesExposicion = [
    { exposicion: 'E', exposicionTexto: 'Muy alto' },
    { exposicion: 'D', exposicionTexto: 'Alto' },
    { exposicion: 'C', exposicionTexto: 'Moderado' },
    { exposicion: 'B', exposicionTexto: 'Bajo' },
    { exposicion: 'A', exposicionTexto: 'Muy bajo' },
  ];

  matriz = this.nivelesExposicion;

  rojo = ['5E', '4E', '3E', '5D', '4D', '5C'];
  amarillo = ['2E', '3D', '2D', '4C', '3C', '2C', '5B', '4B', '3B', '5A', '4A'];
  verde = ['1E', '1D', '1C', '2B', '1B', '3A', '2A', '1A'];
  /*
getColorClass(riesgo: string, exposicion: string): string {
  const key = riesgo + exposicion;
  if (this.rojo.includes(key)) return 'rojo';
  if (this.amarillo.includes(key)) return 'amarillo';
  if (this.verde.includes(key)) return 'verde';
  return '';
}
*/

  // Variables de categoría actual
  //categoriaRiesgoSeleccionada =    1;// this.determinarCategoriaORP();  // Ejemplo: valor numérico 1–5
  //categoriaExposicionSeleccionada = 'A';//this.categoria;  // Ejemplo: 'A'–'E'
  categoriaRiesgoSeleccionada: number | string = '';
  categoriaExposicionSeleccionada: string = '';
  // Combinaciones
  //rojo = ['5E', '4E', '3E', '5D', '4D', '5C'];
  //amarillo = ['2E', '3D', '2D', '4C', '3C', '2C', '5B', '4B', '3B', '5A', '4A'];
  //verde = ['1E', '1D', '1C', '2B', '1B', '3A', '2A', '1A'];

  getColorClass(riesgo: number, exposicion: string): string {
    const valor = `${riesgo}${exposicion}`;
    const actual = `${this.categoriaRiesgoSeleccionada}${this.categoriaExposicionSeleccionada}`;

    let clase = '';

    if (this.rojo.includes(valor)) clase = 'rojo';
    else if (this.amarillo.includes(valor)) clase = 'amarillo';
    else if (this.verde.includes(valor)) clase = 'verde';

    if (valor === actual) clase += ' parpadeo';

    return clase;
  }
  actualizarCategoriaSeleccionada(): void {
    this.categoriaRiesgoSeleccionada = this.determinarCategoriaORP();
    this.categoriaExposicionSeleccionada = this.categoria;
    console.log(
      'Actual:',
      this.categoriaRiesgoSeleccionada + this.categoriaExposicionSeleccionada
    );
  }

  mostrarTooltip(riesgo: number, exposicion: string): string {
    const actual = `${this.categoriaRiesgoSeleccionada}${this.categoriaExposicionSeleccionada}`;
    const valor = `${riesgo}${exposicion}`;

    if (valor === actual) {
      return 'Intensidad de la vigilancia';
    }

    return ''; // Retorna cadena vacía en lugar de null
  }

  resaltarCelda(riesgo: number, exposicion: string): boolean {
    return (
      riesgo === this.categoriaRiesgoSeleccionada &&
      exposicion === this.categoriaExposicionSeleccionada
    );
  }
  /*
resultadoFinal: { resultadoCruce: string } | null = {
  resultadoCruce:  '2E' // Ejemplo
};*/

  get resultadoFinal(): { resultadoCruce: string } | null {
    if (
      this.categoriaRiesgoSeleccionada &&
      this.categoriaExposicionSeleccionada
    ) {
      return {
        resultadoCruce: `${this.categoriaRiesgoSeleccionada}${this.categoriaExposicionSeleccionada}`,
      };
    }
    return null;
  }

  getNivelIntensidad(valor: string): { nivel: string; color: string } {
    const rojo = ['5E', '4E', '3E', '5D', '4D', '5C'];
    const amarillo = [
      '2E',
      '3D',
      '2D',
      '4C',
      '3C',
      '2C',
      '5B',
      '4B',
      '3B',
      '5A',
      '4A',
    ];
    const verde = ['1E', '1D', '1C', '2B', '1B', '3A', '2A', '1A'];

    if (rojo.includes(valor))
      return { nivel: 'RIGUROSO - 6 MESES', color: 'red' };
    if (amarillo.includes(valor))
      return { nivel: 'NORMAL - 12 MESES', color: 'yellow' };
    if (verde.includes(valor))
      return { nivel: 'REDUCIDA - 18 MESES', color: 'green' };

    return { nivel: 'DESCONOCIDO', color: 'gray' };
  }

  //muestra para definir la muestra

  poblacionRangos = [
    { label: '0', valor: 0 },
    { label: '1', valor: 1 },
    { label: '2 - 8', valor: 2 },
    { label: '9 - 15', valor: 9 },
    { label: '16 - 25', valor: 16 },
    { label: '26 - 50', valor: 26 },
    { label: '51 - 90', valor: 51 },
    { label: '91 - 150', valor: 91 },
    { label: '151 - 280', valor: 151 },
    { label: '281 - 500', valor: 281 },
  ];

  readonly categoriaAlta = ['5E', '4E', '3E', '5D', '4D', '5C'];
  readonly categoriaMedia = [
    '2E',
    '3D',
    '2D',
    '4C',
    '3C',
    '2C',
    '5B',
    '4B',
    '3B',
    '5A',
    '4A',
  ];
  readonly categoriaBaja = ['1E', '1D', '1C', '2B', '1B', '3A', '2A', '1A'];

  readonly valoresPorPoblacion = [
    { rango: [0], alta: 0, media: 0, baja: 0 },
    { rango: [1], alta: 1, media: 1, baja: 1 },
    { rango: [2, 8], alta: 3, media: 2, baja: 2 },
    { rango: [9, 15], alta: 5, media: 3, baja: 2 },
    { rango: [16, 25], alta: 8, media: 5, baja: 3 },
    { rango: [26, 50], alta: 13, media: 8, baja: 5 },
    { rango: [51, 90], alta: 20, media: 13, baja: 5 },
    { rango: [91, 150], alta: 32, media: 20, baja: 8 },
    { rango: [151, 280], alta: 50, media: 32, baja: 20 },
    { rango: [281, 500], alta: 80, media: 50, baja: 20 },
  ];

  get filass(): FormArray {
    return this.form.get('filas') as FormArray;
  }

  getResultado(i: number): number {
    const poblacion = this.filass.at(i).get('poblacionRangos')?.value;
    const categoria = '5E';
    return this.calcularValorResultado(poblacion, categoria);
  }

  calcularValorResultado(poblacion: number, categoria: string): number {
    console.log('poblacion :' + poblacion);
    console.log('categoria :' + categoria);
    if (poblacion == null || categoria == null) return 0;

    const grupo = this.valoresPorPoblacion.find(
      (r) => poblacion >= r.rango[0] && poblacion <= r.rango[1]
    );

    if (!grupo) return 0;
    if (this.categoriaAlta.includes(categoria)) return grupo.alta;
    if (this.categoriaMedia.includes(categoria)) return grupo.media;
    if (this.categoriaBaja.includes(categoria)) return grupo.baja;

    return 0;
  }
}
