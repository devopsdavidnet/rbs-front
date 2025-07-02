import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.css']
})
export class PlanificacionComponent {
  columnas: string[] = ['tipoOrganizacion', 'organizacion', 'fechaAsignacion', 'estado', 'acciones'];

  dataSource = new MatTableDataSource([
    {
      tipoOrganizacion: 'AOC',
      organizacion: 'AeroBolivia S.A.',
      fechaAsignacion: new Date('2024-05-10'),
      estado: 'Activo'
    },
    {
      tipoOrganizacion: 'OMA',
      organizacion: 'HeliSur SRL',
      fechaAsignacion: new Date('2023-11-20'),
      estado: 'Inactivo'
    }
  ]);

 form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      companyName: [''],
      location: ['']
    });
  }

  @ViewChild('tabGroup') tabGroup: any;
selectedData: any = null; // Para almacenar los datos del elemento seleccionado

editar(row: any) {
  if (row.estado === 'Activo') {
    this.selectedData = row; // opcional, si necesitas usar los datos en otras partes
 const tipoOrganizacion = row.tipoOrganizacion;
  const organizacion = row.organizacion;
  console.log('Tipo de Organización:', tipoOrganizacion);
  console.log('Organización:', organizacion);

  // Puedes, por ejemplo, llenar un formulario o pasar los datos al segundo tab:
  this.form.get('companyName')?.setValue(organizacion);
  this.form.get('location')?.setValue(tipoOrganizacion);

   


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

}
