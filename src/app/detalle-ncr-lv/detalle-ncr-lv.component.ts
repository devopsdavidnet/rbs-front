import { Component, Inject, OnInit } from '@angular/core';
import { FilaVerificacion } from '../planificacion/planificacion.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-ncr-lv',
  templateUrl: './detalle-ncr-lv.component.html',
  styleUrls: ['./detalle-ncr-lv.component.css'],
})
export class DetalleNcrLvComponent {
  resultadoNcrLv!: number;
  displayedColumns: string[] = ['cumplimiento', 'valor'];

  dataNcr = [
    { cumplimiento: '0-60', valor: 2, resaltar: false },
    { cumplimiento: '60-80', valor: 1, resaltar: false },
    { cumplimiento: '80-100', valor: 0, resaltar: false },
  ];
  constructor(
    public dialogRef: MatDialogRef<DetalleNcrLvComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.resultadoNcrLv = this.calcularResultadoNcrLv(data);
  }

  calcularResultadoNcrLv(data: any): number {
    const total =
      data.satisfactorio + data.insatisfactorio + data.noSatifConPacVigente;

    if (total === 0) return 0;

    const resultado = (data.satisfactorio / total) * 100;

    return Number(resultado.toFixed(5)); // 🔹 redondeado a 5 decimales
  }

  ngOnInit() {
    const resultado = this.resultadoNcrLv;

    this.dataNcr.forEach((item) => {
      item.resaltar = false;
    });
    console.log('resultado', resultado);
    /*if (resultado >= 0 && resultado <= 60) this.dataNcr[0].resaltar = true;
    if (resultado >= 61 && resultado <= 80) this.dataNcr[1].resaltar = true;
    if (resultado >= 81 && resultado <= 100) this.dataNcr[2].resaltar = true;*/
    if (resultado >= 0 && resultado <= 60) {
      this.dataNcr[0].resaltar = true; // Valor NCR 2
    } else if (resultado > 60 && resultado <= 80) {
      this.dataNcr[1].resaltar = true; // Valor NCR 1
    } else if (resultado > 80 && resultado <= 100) {
      this.dataNcr[2].resaltar = true; // Valor NCR 0
    }
  }
}
