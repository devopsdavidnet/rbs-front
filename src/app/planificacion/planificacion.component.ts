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
     niveles = [1, 2, 3,'N/A'];
     nivel1Count = 0;
     nivel2Count = 0;
     nivel3Count = 0;
     nivelNA = 0;
    sumaResultadoPonderado:number=0;

     
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
   
  //tabien es necesario llamar a este cálculo cuadno cambien los 
//valores por ejemplo, en el ngOnInit o cuando se inicializa el formulario
this.form.valueChanges.subscribe(()=>{
 this.calcularSumaPonderada();
});

}

/*determinarCategoriaORP(): string {
  if (this.sumaResultadoPonderado >= 0 && this.sumaResultadoPonderado <= 20) {
    return 'Bajo';
  } else if (this.sumaResultadoPonderado > 20 && this.sumaResultadoPonderado <= 40) {
    return 'Medio';
  } else if (this.sumaResultadoPonderado > 40) {
    return 'Alto';
  }
  return 'No determinado';
}
  
*/

determinarCategoriaORP(): number | string {
   const puntaje = this.sumaResultadoPonderado;
   if(puntaje >=100 && puntaje <=140 ){
   return 1 //más deseable
   }else if(puntaje > 140 && puntaje <=180){
    return 2;
   }else if(puntaje > 180 && puntaje <=220){
    return 3;
   }else if(puntaje > 220 && puntaje <= 260){
    return 4;
   }else if(puntaje >260 && puntaje <= 300){
    return 5; // menos deseable 
   }else {
    return "Fuera de rango"; // en caso de que el puntaje no esté en los rangos definidos
   }
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
  const filasArray = this.form.get('filas') as FormArray;
  filasArray.clear();

  datos.forEach(item => {
    const filaGroup = this.fb.group({
      idOrp: [item.idOrp],
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
 // metodo calcula la suma ponderada
/*calcularSumaPonderada(){
   this.sumaResultadoPonderado=0;
   this.dataSource3.data.forEach(row => {
   const FormGroup= this.getFormGroupById(row.idOrp);
   const resultadoNivel = FormGroup.get('resultadoNivel')?.value;
   const peso=row.peso;
   if(resultadoNivel && peso){
    this.sumaResultadoPonderado+=resultadoNivel*peso;
    // Redondea a 2 decimales
     this.sumaResultadoPonderado = parseFloat(this.sumaResultadoPonderado.toFixed(2));
   }
   })
}*/


nivelNACount: number = 0;

calcularSumaPonderada() {
  this.sumaResultadoPonderado = 0;
  this.nivelNACount = 0;

  this.dataSource3.data.forEach(row => {
    const formGroup = this.getFormGroupById(row.idOrp);
    const resultadoNivel = formGroup?.get('resultadoNivel')?.value; // Encadenamiento opcional

    if (resultadoNivel === undefined || resultadoNivel === null || resultadoNivel === "N/A" || isNaN(resultadoNivel)) {
      this.nivelNACount++;
      return;
    }

    const peso = row.peso;
    if (peso && typeof resultadoNivel === 'number') {
      this.sumaResultadoPonderado += resultadoNivel * peso;
    }
  });

  this.sumaResultadoPonderado = parseFloat(this.sumaResultadoPonderado.toFixed(2));
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

contarNiveles(): void {
  const filas = this.form.get('filas') as FormArray;
  this.nivel1Count = 0;
  this.nivel2Count = 0;
  this.nivel3Count = 0;
  this.nivelNA = 0;

  filas.controls.forEach(ctrl => {
    const nivel = ctrl.get('resultadoNivel')?.value;
    if (nivel === 1) this.nivel1Count++;
    else if (nivel === 2) this.nivel2Count++;
    else if (nivel === 3) this.nivel3Count++;
    else if (nivel === 'N/A') this.nivelNA++;
  });
}

}
