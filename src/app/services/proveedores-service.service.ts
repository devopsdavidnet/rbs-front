import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError } from 'rxjs';
import Proveedores from '../modelos/Proveedores';


@Injectable({
  providedIn: 'root'
})
export class ProveedoresServiceService {
 private apiUrl='http://localhost:8090/api/';
 proveedor?: Proveedores[];

 
constructor(private http:HttpClient) { 
  
/*this.proveedor={

    id:1,
    nombreOrganizacion: "aa",
    tipoExplotador: "bb",
    otroTipoProveedor: "ccc",
    departamento: "ddd",
    direccionOrganizacion: "eeee",
    telefonoOrganizacion:"ffff",
    correoOrganizacion:"gggg",
    nacionalidadOrganizacion:"hhh",
    tamanoOrganizacion:"iii",
    complejidadOrganizacion: "jjjj",
    tieneSms: false,
    fechaAceptacionSms: "10/10/80",
    creadoEn: "si"

}*/


}


/*  setProveedores(nombreOrganizacion: string):void {
   this.proveedor.nombreOrganizacion= nombreOrganizacion;

  }
*/

/*getProveedores(){
    
   no fucniona asi  
  return this.http.get<Proveedores[]>(this.apiUrl);
}

getProveedor(id: number){
return this.http.get<Proveedores>(this.apiUrl+"/"+id);

}*/

public getProveedores():Observable<any>{
   return this.http.get<any>(this.apiUrl+"proveedores");
 
}
public getParamOrp():Observable<any>{
   return this.http.get<any>(this.apiUrl+"paramorp");

}




}
