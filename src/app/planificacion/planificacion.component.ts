import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from '../services/global.service';
import { ProveedoresServiceService } from '../services/proveedores-service.service';
import Proveedores from '../modelos/Proveedores';

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
  styleUrls: ['./planificacion.component.css']
})
export class PlanificacionComponent implements OnInit {
     niveles = [1, 2, 3];
  dataSource2 = new MatTableDataSource<FormGroup>();

  displayedColumns: string[] = [
    'nro',
    'parametro',
    'nivel3',
    'nivel2',
    'nivel1',
    'resultadoNivel'
  ];
  
  
  //form: FormGroup;
  
  columnas: string[] = ['tipoOrganizacion', 'organizacion', 'fechaAsignacion', 'estado', 'acciones'];
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
  dataSource1= new MatTableDataSource<any>();

 form: FormGroup;

  constructor(private fb: FormBuilder,private global:GlobalService,private proveedorService:ProveedoresServiceService) {
    this.form = this.fb.group({
      companyName: [''],
      location: [''],
      filas:this.fb.array([])
    });


   


    this.global.isMobile$.subscribe(valor => {
      this.isMobile = valor;
    });
  }

  


  ngOnInit(): void {
     console.log('AAAAAAAAAAAAAAAAAAAaa');
     
  

 this.proveedorService.getProveedores().subscribe(data => {this.proveedoresLista=data });
  console.log(this.proveedoresLista);
  console.log("AAAAAAAAAAAAAAAAAAADDDDDDDDDDDdddddd"+this.proveedoresLista);

  console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
  this.proveedorService.getProveedores().subscribe(data => {
    //this.datos = data; console.log(this.datos);
   this.dataSource1 = data; console.log(this.dataSource1);
    
  });


 const data: Fila[] = [
      {
        nro: 1,
        parametro: 'Retroalimentación para determinar la aceptación general de la organización',
        nivel3: 'Percibida como una OMA no deseada - desde la perspectiva del empleado o cliente.Muy alto',
        nivel2: 'Percibida como una OMA promedio - desde la perspectiva del cliente o del empleado.',
        nivel1: 'Percibida como una OMA deseable - desde la perspectiva del cliente o del empleado.',
        resultadoNivel: null
      },
      {
        nro: 2,
        parametro: 'Estado financiero de la OMA',
        nivel3: 'Frecuentes infracciones',
        nivel2: 'Algunas observaciones',
        nivel1: 'Consistentemente rentable',
        resultadoNivel: null
      }
    ];

    const formArray = this.form.get('filas') as FormArray;
    data.forEach(dato => {
      const grupo = this.fb.group({
        nro: [dato.nro],
        parametro: [dato.parametro],
        nivel3: [dato.nivel3],
        nivel2: [dato.nivel2],
        nivel1: [dato.nivel1],
        resultadoNivel: [dato.resultadoNivel]
      });
      formArray.push(grupo);
    });

    // Asociamos el FormArray al MatTableDataSource
    this.dataSource2.data = formArray.controls as FormGroup[];



  
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


/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  niveles = [1, 2, 3];

  displayedColumns: string[] = [
    'nro',
    'parametro',
    'nivel3',
    'nivel2',
    'nivel1',
    'resultadoNivel'
  ];

  dataSource = [
    {
      nro: 1,
      parametro: 'Riesgo financiero',
      nivel3: 'Muy alto',
      nivel2: 'Moderado',
      nivel1: 'Bajo',
      resultadoNivel: null
    },
    {
      nro: 2,
      parametro: 'Cumplimiento normativo',
      nivel3: 'Frecuentes infracciones',
      nivel2: 'Algunas observaciones',
      nivel1: 'Cumple totalmente',
      resultadoNivel: null
    }
  ];
}

*/



  get filas(): FormArray {
    return this.form.get('filas') as FormArray;
  }

  guardar(): void {
    const valores = this.filas.value;
    console.log('📝 JSON Resultado:', JSON.stringify(valores, null, 2));
  }
}
