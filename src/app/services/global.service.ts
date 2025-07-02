import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
public isMobile$ = new BehaviorSubject<boolean>(false);
  constructor() { }


  // Método para actualizar el valor
  setIsMobile(value: boolean) {
    this.isMobile$.next(value);
  }

  // Método para obtener el valor actual sincrónicamente (no recomendado si no es necesario)
  getIsMobile(): boolean {
    return this.isMobile$.getValue();
  }
}
