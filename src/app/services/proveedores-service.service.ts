import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError } from 'rxjs';
import Proveedores from '../modelos/Proveedores';


@Injectable({
  providedIn: 'root'
})
export class ProveedoresServiceService {
 private apiUrl='http://192.168.25.17:8090/api/';
 proveedor?: Proveedores[];

 
constructor(private http:HttpClient) { 
  



}


public getProveedores():Observable<any>{
   return this.http.get<any>(this.apiUrl+"proveedores");
 
}
public getParamOrp():Observable<any>{
   return this.http.get<any>(this.apiUrl+"paramorp");

}




}
