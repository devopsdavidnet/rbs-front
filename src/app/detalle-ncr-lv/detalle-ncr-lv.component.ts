import { Component, Inject } from '@angular/core';
import { FilaVerificacion } from '../planificacion/planificacion.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-ncr-lv',
  templateUrl: './detalle-ncr-lv.component.html',
  styleUrls: ['./detalle-ncr-lv.component.css'],
})
export class DetalleNcrLvComponent {
  resultadoNcrLv!: number;
  /*constructor(@Inject(MAT_DIALOG_DATA) public data: FilaVerificacion) {
    this.resultadoNcrLv = this.calcularResultadoNcrLv(data);
  }*/

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
}
