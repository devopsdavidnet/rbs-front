import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParamorpService {

  private apiUrl='http://localhost:8090/api/paramorp'
  listaParamOpr?: any[];

  constructor(private http:HttpClient) {

   }

  public getParamOpr():Observable<any> {
    return this.http.get<any>(this.apiUrl);


  }
}
