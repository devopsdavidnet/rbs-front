import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from '../services/global.service';
import { ProveedoresServiceService } from '../services/proveedores-service.service';
import Proveedores from '../modelos/Proveedores';
import Orp from '../modelos/Orp';

import { MatPaginator } from '@angular/material/paginator';
import { AfterViewInit } from '@angular/core';


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
     niveles = [0,1, 2, 3];

     
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'nro',
    'parametro',
    'nivel3',
    'nivel2',
    'nivel1',
    'resultadoNivel'
  ];
  
   columnas: string[] = 
   ['tipoOrganizacion', 
    'organizacion', 
    'fechaAsignacion', 
    'estado', 
    'acciones'
  ];
  
  datos: any[] = [];
  isMobile: boolean = true;
  proveedoresLista?:Proveedores[];
  oprLista?:Orp[];
  dataSource1= new MatTableDataSource<Proveedores>();
  dataSource3 =new MatTableDataSource<any>();
 
  form!: FormGroup;


  constructor(private fb: FormBuilder,private global:GlobalService,private proveedorService:ProveedoresServiceService) {
 

  this.global.isMobile$.subscribe(valor => {
      this.isMobile = valor;
    });
  }





 ngOnInit(): void {
 this.form = this.fb.group({
 companyName: [''],
 location: [''],
 filas:this.fb.array([])
 });



this.proveedorService.getProveedores().subscribe(data => {this.dataSource1 = data; console.log(this.dataSource1); });

   this.proveedorService.getParamOrp().subscribe(data => {
    this.dataSource3.data = data;         
    this.initFormArray(data);             
  });    

    this.proveedorService.getParamOrp().subscribe(data => { this.datos = data; console.log(this.datos);}) ;        
   
  
}

  ngAfterViewInit(): void {
  this.dataSource3.paginator = this.paginator;
}

getFormGroupById(idOrp: number): FormGroup {
  const filas = this.form.get('filas') as FormArray;
  const index = this.dataSource3.data.findIndex(d => d.idOrp === idOrp);
  return filas.at(index) as FormGroup;
}


 initFormArray(datos: any[]): void {
   console.log("dddddddddddddddddddddatossss");
   console.log(datos) ; 
    const filasArray = this.form.get('filas') as FormArray;
    filasArray.clear();

    datos.forEach((item) => {
      const filaGroup = this.fb.group({
        idOrp: [item.idOrp],
        parametroRiesgosOrganizacion: [item.parametroRiesgosOrganizacion],
        nivelTresMenosDeseableo: [item.nivelTresMenosDeseableo],
        nivelDosPromedio: [item.nivelDosPromedio],
        nivelUnoMasDeseable: [item.nivelUnoMasDeseable],
        resultadoNivel: [item.resultadoNivel ?? null],
      });
      filasArray.push(filaGroup);
    });
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


  get filas(): FormArray {
    return this.form.get('filas') as FormArray;
  }

  guardar(): void {
    const valores = this.filas.value;
    console.log('📝 JSON Resultado:', JSON.stringify(valores, null, 2));
  }
}
