import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from '../services/global.service';
import { ProveedoresServiceService } from '../services/proveedores-service.service';
import Proveedores from '../modelos/Proveedores';

@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.css']
})
export class PlanificacionComponent implements OnInit {
  columnas: string[] = ['tipoOrganizacion', 'organizacion', 'fechaAsignacion', 'estado', 'acciones'];
  //displayedColumns

  datos: any[] = [];
isMobile: boolean = true;
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
   proveedoresLista?:Proveedores[];
  dataSource1= new MatTableDataSource<Proveedores>();

 form: FormGroup;

  constructor(private fb: FormBuilder,private global:GlobalService,private proveedorService:ProveedoresServiceService) {
    this.form = this.fb.group({
      companyName: [''],
      location: ['']
    });
    this.global.isMobile$.subscribe(valor => {
      this.isMobile = valor;
    });
  }
  ngOnInit(): void {
     console.log('AAAAAAAAAAAAAAAAAAAaa');
     
    /*this.asignacion.getProveedores().subscribe((data)=>{
      this.dataSource.data=data;
      console.log('RRRRR'+data);
    });*/
   /*this.asignacion.getProveedores().subscribe((data: ProveedorAsignado[]) => {
    console.log(' Datos recibidos del servicio:', data);
    this.dataSource.data = data;
  });*/
    
  //  this.proveedorService.getProveedores().subscribe(data=>this.dataSource1=data);

 this.proveedorService.getProveedores().subscribe(data => {this.proveedoresLista=data });
  console.log(this.proveedoresLista);
  console.log("AAAAAAAAAAAAAAAAAAADDDDDDDDDDDdddddd"+this.proveedoresLista);

  console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
  this.proveedorService.getProveedores().subscribe(data => {
    this.dataSource1 = data; console.log(this.datos);
  });


 


}



  @ViewChild('tabGroup') tabGroup: any;
selectedData: any = null; // Para almacenar los datos del elemento seleccionado

editar(row: any) {
  if (row.estado === 'Activo') {
    this.selectedData = row; // opcional  si necesitas usar los datos en otras partes
 const tipoOrganizacion = row.tipoOrganizacion;
  const organizacion = row.organizacion;
  console.log('Tipo de Organización:', tipoOrganizacion);
  console.log('Organización:', organizacion);

  //  llenar un formulario o pasar los datos al segundo tab:
  this.form.get('companyName')?.setValue(organizacion);
  this.form.get('location')?.setValue(tipoOrganizacion);

   console.log('RRRRRRRRRRRRRRRRRRR'+this.isMobile    
   )


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
